import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";
import { emailHeader, emailFooter, wrapEmail, GRADIENTS } from "@/lib/email-templates";

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
  return wrapEmail(`
    ${emailHeader("New Contact Form Submission", GRADIENTS.contact)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      <div style="margin-bottom: 1.5rem;">
        <p style="color: #6b7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.25rem;">From</p>
        <p style="color: #111; font-size: 1rem; font-weight: 600; margin: 0;">${name}</p>
        <p style="color: #6b7280; font-size: 0.875rem; margin: 0.25rem 0 0;">${email}</p>
      </div>
      <div>
        <p style="color: #6b7280; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.5rem;">Message</p>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1rem;">
          <p style="color: #111; font-size: 0.95rem; line-height: 1.6; margin: 0;">${message.replace(/\n/g, "<br/>")}</p>
        </div>
      </div>
    </div>
    ${emailFooter()}
  `);
}

function buildContactConfirmation(name: string) {
  return wrapEmail(`
    ${emailHeader("Message Received!", GRADIENTS.contact)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      <p style="font-size: 1rem; color: #374151; margin: 0 0 1rem;">Hi ${name},</p>
      <p style="font-size: 0.95rem; color: #374151; line-height: 1.7; margin: 0 0 1.25rem;">Thank you for reaching out to BlackBox Tech. We've received your message and our team will get back to you as soon as possible — usually within 24 hours.</p>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1.25rem;">
        <p style="font-size: 0.9rem; color: #374151; font-weight: 700; margin: 0 0 0.75rem;">In the meantime:</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Explore our <a href="https://blackboxtech-nine.vercel.app" style="color: #fb4545dc; text-decoration: none;">website</a> to learn about our services</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Check out our training programs for students &amp; professionals</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Browse our product catalog</td></tr>
        </table>
      </div>
      <p style="font-size: 0.9rem; color: #374151; margin: 0 0 1rem;">Need immediate assistance? Email us at <a href="mailto:info@blackboxtech.online" style="color: #fb4545dc; text-decoration: none;">info@blackboxtech.online</a></p>
      <p style="font-size: 0.9rem; color: #374151; margin: 0;">Best regards,<br/><strong>The BlackBox Tech Team</strong></p>
    </div>
    ${emailFooter()}
  `);
}
