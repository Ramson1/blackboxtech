import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = "BlackBox Tech <info@blackboxtech.online>";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.log(`[Resend] Would send to ${to}: ${subject}`);
    return { error: "Resend not configured" };
  }

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return { data };
  } catch (error) {
    console.error("[Resend] Error sending email:", error);
    return { error };
  }
}
