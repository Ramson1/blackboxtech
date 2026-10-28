/**
 * Non-blocking n8n lead webhook dispatcher.
 *
 * Sends a structured JSON payload (lead details + full UTM attribution)
 * to the configured n8n workflow endpoint. Designed to NEVER break lead
 * capture: if the webhook URL is not configured, the request times out,
 * or n8n returns an error, the failure is logged and swallowed so the
 * Supabase write that already succeeded remains intact.
 */

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  ttclid?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
  first_seen?: string;
};

export type LeadPayload = {
  /** Which funnel produced this lead. */
  leadType:
    | "contact_message"
    | "student_registration"
    | "professional_registration"
    | "build_request"
    | "fast_quote";
  /** Human-readable summary, e.g. course name or project type. */
  interest: string;
  name: string;
  email: string;
  phone?: string;
  /** Free-form details from the source form. */
  details?: Record<string, unknown>;
  /** Full UTM / click-ID attribution object. */
  attribution: Attribution;
  /** Supabase table the record was saved to (if persisted). */
  sourceTable?: string;
  /** Primary key of the persisted row — required to flip n8n_synced after dispatch. */
  rowId?: string | null;
  timestamp: string;
};

const WEBHOOK_TIMEOUT_MS = 3000;

/**
 * Flip n8n_synced = true on the persisted lead row after the webhook accepted
 * the payload. Requires the service-role key (RLS blocks anon/authenticated
 * UPDATE without a session). Best-effort: never throws.
 */
async function markLeadSynced(sourceTable: string, rowId: string): Promise<void> {
  try {
    const { getSupabaseAdmin } = await import("@/lib/supabase");
    const admin = getSupabaseAdmin();
    if (!admin) return; // No service-role key — leave n8n_synced = false.
    const { error } = await admin.from(sourceTable).update({ n8n_synced: true }).eq("id", rowId);
    if (error) console.error(`[n8n] failed to mark ${sourceTable}/${rowId} synced:`, error.message);
  } catch (err) {
    console.error(`[n8n] markLeadSynced error for ${sourceTable}/${rowId}:`, (err as Error)?.message);
  }
}

/**
 * Best-effort dispatch of a lead to n8n. Always resolves; never throws.
 * Call AFTER the Supabase insert succeeds, and do not await it in the
 * response path if you want zero latency impact (fire-and-forget is fine —
 * the internal timeout keeps the function from hanging).
 */
export async function dispatchLead(payload: LeadPayload): Promise<boolean> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) {
    // Webhook not configured yet — silently skip so leads still save.
    return false;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (process.env.N8N_WEBHOOK_SECRET) {
      headers["x-n8n-secret"] = process.env.N8N_WEBHOOK_SECRET;
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...payload, timestamp: payload.timestamp || new Date().toISOString() }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      console.error(`[n8n] webhook responded ${res.status} for ${payload.leadType}`);
      return false;
    }
    // 2xx — n8n accepted the lead; record sync state on the row when we have it.
    if (payload.rowId && payload.sourceTable) {
      await markLeadSynced(payload.sourceTable, payload.rowId);
    }
    return true;
  } catch (err) {
    // Timeout (AbortError) or network failure — never break the lead flow.
    console.error(`[n8n] webhook dispatch failed for ${payload.leadType}:`, (err as Error)?.message);
    return false;
  }
}

/**
 * Server-side helper: extract the first-touch attribution cookie written by
 * lib/attribution.ts as a fallback when the client didn't send attribution
 * in the request body.
 */
export function attributionFromCookie(request: { cookies: { get(name: string): { value: string } | undefined } }): Attribution {
  try {
    const cookie = request.cookies.get("bb_attrib");
    if (!cookie?.value) return {};
    return JSON.parse(decodeURIComponent(cookie.value));
  } catch {
    return {};
  }
}
