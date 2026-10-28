import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/supabase";
import { dispatchLead, attributionFromCookie, type Attribution } from "@/lib/automation/n8n-webhook";

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

    return NextResponse.json({ success: true, message: "Quote request received" });
  } catch (error) {
    console.error("Fast quote error:", error);
    return NextResponse.json({ error: "Failed to submit quote request" }, { status: 500 });
  }
}
