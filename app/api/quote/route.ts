import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";
import { emailHeader, emailFooter, wrapEmail, GRADIENTS } from "@/lib/email-templates";
import { dispatchLead, attributionFromCookie, type Attribution } from "@/lib/automation/n8n-webhook";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "blackboxinfo01@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, category, interest, interestId, budget } = body;

    if (!fullName || !email || !interest) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const attribution: Attribution =
      body.attribution && Object.keys(body.attribution).length > 0
        ? body.attribution
        : attributionFromCookie(request);

    // Persist the lead first — the webhook must never block or break capture.
    // insertLead uses the service-role client (with .select("id")) when configured,
    // otherwise a plain anon insert — never .select() chained on anon, which the
    // hardened RLS policies on blackbox_quote_requests would reject.
    const rowId = await insertLead("blackbox_quote_requests", {
      full_name: fullName,
      email,
      phone: phone || null,
      category: category || null,
      interest,
      interest_id: interestId || null,
      budget: budget || null,
      landing_page: body.landingPage || null,
      attribution,
    });

    // Fire-and-forget n8n dispatch (3s timeout, errors swallowed inside).
    void dispatchLead({
      leadType: "fast_quote",
      interest: `${category === "training" ? "Training" : "Build"}: ${interest}${budget ? ` (budget: ${budget})` : ""}`,
      name: fullName,
      email,
      phone,
      details: { category, interestId, budget },
      attribution,
      sourceTable: "blackbox_quote_requests",
      rowId,
      timestamp: new Date().toISOString(),
    });

    // Notify the team so they can respond immediately (awaited so the send
    // completes before the serverless function returns).
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `New Fast Quote Request — ${fullName} (${interest})`,
      html: buildQuoteAdminEmail({ fullName, email, phone, category, interest, budget }),
    });

    return NextResponse.json({ success: true, message: "Quote request received" });
  } catch (error) {
    console.error("Fast quote error:", error);
    return NextResponse.json({ error: "Failed to submit quote request" }, { status: 500 });
  }
}

function buildQuoteAdminEmail({
  fullName,
  email,
  phone,
  category,
  interest,
  budget,
}: {
  fullName: string;
  email: string;
  phone?: string;
  category?: string;
  interest: string;
  budget?: string;
}) {
  const rows: [string, string | undefined][] = [
    ["Name", fullName],
    ["Email", email],
    ["Phone", phone || undefined],
    ["Funnel", category === "training" ? "Training" : category === "build" ? "Build" : category || undefined],
    ["Interest", interest],
    ["Budget", budget || undefined],
  ];
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `
      <div style="margin-bottom: 0.85rem;">
        <p style="color: #6b7280; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.2rem;">${label}</p>
        <p style="color: #111; font-size: 0.95rem; font-weight: 600; margin: 0;">${value}</p>
      </div>`,
    )
    .join("");

  return wrapEmail(`
    ${emailHeader("New Fast Quote Request", GRADIENTS.quote)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      ${body}
      <p style="color: #6b7280; font-size: 0.85rem; line-height: 1.6; margin: 1.25rem 0 0;">Respond as soon as possible — this lead requested a quote directly from the website.</p>
    </div>
    ${emailFooter()}
  `);
}
