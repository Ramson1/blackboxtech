import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "blackboxinfo01@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Insert into Supabase
    const { error } = await supabase.from("blackbox_contact_messages").insert({
      name,
      email,
      message,
    });
    if (error) throw error;

    // Send admin notification + client confirmation
    await Promise.all([
      sendEmail({
        to: ADMIN_EMAIL,
        subject: `New message from ${name} — BlackBox Tech`,
        html: buildContactAdminEmail(name, email, message),
      }),
      sendEmail({
        to: email,
        subject: "We received your message — BlackBox Tech",
        html: buildContactConfirmation(name),
      }),
    ]);

    return NextResponse.json({ success: true, message: "Message sent" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

function buildContactAdminEmail(name: string, email: string, message: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%); padding: 1.5rem; border-radius: 1rem 1rem 0 0;">
        <h2 style="color: #fff; margin: 0; font-size: 1.25rem;">New Contact Form Submission</h2>
      </div>
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0 0 1rem 1rem; border: 1px solid #e5e7eb;">
        <div style="margin-bottom: 1.5rem;">
          <p style="color: #6b7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.25rem;">From</p>
          <p style="color: #111; font-size: 1rem; font-weight: 600; margin: 0;">${name}</p>
          <p style="color: #6b7280; font-size: 0.875rem; margin: 0.25rem 0 0;">${email}</p>
        </div>
        <div>
          <p style="color: #6b7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.25rem;">Message</p>
          <p style="color: #111; font-size: 0.95rem; line-height: 1.6; margin: 0;">${message.replace(/\n/g, "<br/>")}</p>
        </div>
      </div>
    </div>`;
}

function buildContactConfirmation(name: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%); padding: 1.5rem; border-radius: 1rem 1rem 0 0;">
        <h2 style="color: #fff; margin: 0;">Message Received!</h2>
      </div>
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0 0 1rem 1rem; border: 1px solid #e5e7eb;">
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to BlackBox Tech. We've received your message and our team will get back to you as soon as possible.</p>
        <p>In the meantime, feel free to explore our website to learn more about our services, products, and training programs.</p>
        <p>Best regards,<br/><strong>The BlackBox Tech Team</strong></p>
      </div>
    </div>`;
}
