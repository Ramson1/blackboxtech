import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export async function POST(request: NextRequest) {
  const password = request.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: "to, subject, and html are required" }, { status: 400 });
    }

    const result = await sendEmail({ to, subject, html });

    if (result.error) {
      return NextResponse.json({ error: String(result.error) }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin send email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
