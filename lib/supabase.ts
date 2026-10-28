import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

// Lazy-init: only creates client on first use (avoids build-time errors with placeholder env vars)
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    if (!url || !key || url === "your-supabase-url") {
      throw new Error("Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// Proxy that lazily initializes on property access
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabase();
    return Reflect.get(client, prop, receiver);
  },
});

// ─── Service-role client (server-only) ──────────────────────────────────────────
// Used for privileged lead writes/reads (e.g. returning row ids after insert and
// marking n8n_synced) on tables whose RLS restricts SELECT/UPDATE to
// authenticated/service_role. Falls back to null when the key isn't configured so
// public form routes keep working with the anon client.

let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !serviceKey || url === "your-supabase-url") return null;
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  }
  return _supabaseAdmin;
}

/**
 * Insert a lead row from a public form route.
 * - With the service-role key: returns the new row id (safe .select() even when
 *   anon SELECT is blocked by RLS).
 * - Without it: plain anon insert (RLS insert policy) and returns null — callers
 *   must NOT chain .select() on the anon client for these tables.
 */
export async function insertLead(table: string, values: Record<string, unknown>): Promise<string | null> {
  const admin = getSupabaseAdmin();
  if (admin) {
    const { data, error } = await admin.from(table).insert(values).select("id").single();
    if (error) throw error;
    return (data?.id as string) ?? null;
  }
  const { error } = await supabase.from(table).insert(values);
  if (error) throw error;
  return null;
}
