import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";
import { emailHeader, emailFooter, wrapEmail, GRADIENTS } from "@/lib/email-templates";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "blackboxinfo01@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (!type) {
      return NextResponse.json({ error: "Registration type is required" }, { status: 400 });
    }

    // Insert into Supabase based on type
    if (type === "student") {
      const { error } = await supabase.from("blackbox_student_registrations").insert({
        parent_name: body.parentName,
        parent_email: body.parentEmail,
        parent_phone: body.parentPhone,
        child_name: body.childName,
        child_age: body.childAge,
        child_gender: body.childGender,
        child_level: body.childLevel,
        programs: Array.isArray(body.programs) ? body.programs : [],
        schedule: body.schedule,
        preferred_time: body.preferredTime,
        start_date: body.startDate,
        payment_plan: body.paymentPlan,
        training_mode: body.trainingMode,
        notes: body.notes,
      });
      if (error) throw error;

      // Send emails
      await Promise.all([
        sendEmail({
          to: ADMIN_EMAIL,
          subject: `Student Registration — ${body.parentName}`,
          html: buildStudentEmail(body),
        }),
        sendEmail({
          to: body.parentEmail,
          subject: "Registration Received — BlackBox Tech Student Training",
          html: buildStudentConfirmation(body),
        }),
      ]);
    } else if (type === "professional") {
      const { error } = await supabase.from("blackbox_professional_registrations").insert({
        full_name: body.fullName,
        email: body.email,
        phone: body.phone,
        gender: body.gender,
        dob: body.dob,
        organization: body.organization,
        job_title: body.jobTitle,
        programs: Array.isArray(body.programs) ? body.programs : [],
        schedule: body.schedule,
        preferred_time: body.preferredTime,
        experience_level: body.experienceLevel,
        training_mode: body.trainingMode,
        payment_preference: body.paymentPreference,
        additional_info: body.additionalInfo,
      });
      if (error) throw error;

      await Promise.all([
        sendEmail({
          to: ADMIN_EMAIL,
          subject: `Professional Training Registration — ${body.fullName}`,
          html: buildProfessionalEmail(body),
        }),
        sendEmail({
          to: body.email,
          subject: "Registration Received — BlackBox Tech Professional Training",
          html: buildProfessionalConfirmation(body),
        }),
      ]);
    } else if (type === "build") {
      const { error } = await supabase.from("blackbox_build_requests").insert({
        company_name: body.companyName,
        full_name: body.fullName,
        email: body.email,
        phone: body.phone,
        project_type: body.projectType,
        budget: body.budget,
        timeline: body.timeline,
        description: body.description,
        files: body.files,
        file_urls: Array.isArray(body.file_urls) ? body.file_urls : [],
        additional_requirements: body.additionalRequirements,
      });
      if (error) throw error;

      await Promise.all([
        sendEmail({
          to: ADMIN_EMAIL,
          subject: `Software Build Request — ${body.companyName || body.fullName}`,
          html: buildSoftwareEmail(body),
        }),
        sendEmail({
          to: body.email,
          subject: "Project Request Received — BlackBox Tech",
          html: buildSoftwareConfirmation(body),
        }),
      ]);
    }

    return NextResponse.json({ success: true, message: "Registration received" });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
  }
}

// ─── Admin notification email builders ─────────────────────────────────────────

function buildStudentEmail(data: Record<string, unknown>) {
  return wrapEmail(`
    ${emailHeader("Student Training Registration", GRADIENTS.student)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      <h3 style="color: #374151; margin: 0 0 0.75rem; font-size: 0.95rem;">Parent / Guardian</h3>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Name:</strong> ${data.parentName}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Email:</strong> ${data.parentEmail}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Phone:</strong> ${data.parentPhone}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0;" />
      <h3 style="color: #374151; margin: 0 0 0.75rem; font-size: 0.95rem;">Child Details</h3>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Name:</strong> ${data.childName}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Age:</strong> ${data.childAge}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Gender:</strong> ${data.childGender}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Level:</strong> ${data.childLevel}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0;" />
      <h3 style="color: #374151; margin: 0 0 0.75rem; font-size: 0.95rem;">Training Preferences</h3>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Programs:</strong> ${Array.isArray(data.programs) ? data.programs.join(", ") : data.programs}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Schedule:</strong> ${data.schedule}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Mode:</strong> ${data.trainingMode === "virtual" ? "Virtual (Online)" : "Physical (In-Person)"}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Payment:</strong> ${data.paymentPlan}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Start Date:</strong> ${data.startDate}</p>
      ${data.notes ? `<p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Notes:</strong> ${data.notes}</p>` : ""}
    </div>
    ${emailFooter()}
  `);
}

function buildProfessionalEmail(data: Record<string, unknown>) {
  return wrapEmail(`
    ${emailHeader("Professional Training Registration", GRADIENTS.professional)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      <h3 style="color: #374151; margin: 0 0 0.75rem; font-size: 0.95rem;">Personal Details</h3>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Name:</strong> ${data.fullName}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Email:</strong> ${data.email}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Phone:</strong> ${data.phone}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Gender:</strong> ${data.gender}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>DOB:</strong> ${data.dob}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0;" />
      <h3 style="color: #374151; margin: 0 0 0.75rem; font-size: 0.95rem;">Professional Information</h3>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Organization:</strong> ${data.organization || "N/A"}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Job Title:</strong> ${data.jobTitle || "N/A"}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0;" />
      <h3 style="color: #374151; margin: 0 0 0.75rem; font-size: 0.95rem;">Training Preferences</h3>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Programs:</strong> ${Array.isArray(data.programs) ? data.programs.join(", ") : data.programs}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Schedule:</strong> ${data.schedule}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Level:</strong> ${data.experienceLevel}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Mode:</strong> ${data.trainingMode === "virtual" ? "Virtual (Online)" : "Physical (In-Person)"}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Payment:</strong> ${data.paymentPreference}</p>
      ${data.additionalInfo ? `<p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Additional:</strong> ${data.additionalInfo}</p>` : ""}
    </div>
    ${emailFooter()}
  `);
}

function buildSoftwareEmail(data: Record<string, unknown>) {
  return wrapEmail(`
    ${emailHeader("Software Build Request", GRADIENTS.build)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      <h3 style="color: #374151; margin: 0 0 0.75rem; font-size: 0.95rem;">Business Details</h3>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Company:</strong> ${data.companyName}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Contact:</strong> ${data.fullName}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Email:</strong> ${data.email}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Phone:</strong> ${data.phone}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1.25rem 0;" />
      <h3 style="color: #374151; margin: 0 0 0.75rem; font-size: 0.95rem;">Project Details</h3>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Type:</strong> ${data.projectType}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Budget:</strong> ${data.budget}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Timeline:</strong> ${data.timeline}</p>
      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Description:</strong> ${data.description}</p>
      ${data.files ? `<p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Files:</strong> ${data.files}</p>` : ""}
      ${data.additionalRequirements ? `<p style="margin: 0.25rem 0; font-size: 0.9rem; color: #374151;"><strong>Requirements:</strong> ${data.additionalRequirements}</p>` : ""}
    </div>
    ${emailFooter()}
  `);
}

// ─── Client confirmation email builders ────────────────────────────────────────

function buildStudentConfirmation(data: Record<string, unknown>) {
  return wrapEmail(`
    ${emailHeader("Registration Received!", GRADIENTS.student)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      <p style="font-size: 1rem; color: #374151; margin: 0 0 1rem;">Hi ${data.parentName},</p>
      <p style="font-size: 0.95rem; color: #374151; line-height: 1.7; margin: 0 0 1.25rem;">Thank you for registering <strong>${data.childName}</strong> for our student training programs at BlackBox Tech. We've received your registration and our team will contact you within 24 hours to confirm the schedule and provide payment details.</p>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1.25rem;">
        <p style="font-size: 0.9rem; color: #374151; font-weight: 700; margin: 0 0 0.75rem;">What happens next:</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Our team will review your registration</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; We'll contact you to confirm the schedule</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Payment details will be provided</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Your child will start learning!</td></tr>
        </table>
      </div>
      <p style="font-size: 0.9rem; color: #374151; margin: 0 0 1rem;">If you have any questions, feel free to reply to this email or contact us at <a href="mailto:info@blackboxtech.online" style="color: #fb4545dc; text-decoration: none;">info@blackboxtech.online</a></p>
      <p style="font-size: 0.9rem; color: #374151; margin: 0;">Best regards,<br/><strong>The BlackBox Tech Team</strong></p>
    </div>
    ${emailFooter()}
  `);
}

function buildProfessionalConfirmation(data: Record<string, unknown>) {
  return wrapEmail(`
    ${emailHeader("Registration Received!", GRADIENTS.professional)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      <p style="font-size: 1rem; color: #374151; margin: 0 0 1rem;">Hi ${data.fullName},</p>
      <p style="font-size: 0.95rem; color: #374151; line-height: 1.7; margin: 0 0 1.25rem;">Thank you for registering for our professional training programs at BlackBox Tech. We've received your registration and our team will contact you within 24 hours.</p>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1.25rem;">
        <p style="font-size: 0.9rem; color: #374151; font-weight: 700; margin: 0 0 0.75rem;">What happens next:</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; We'll review your registration and preferences</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; We'll contact you to discuss the best program fit</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Payment and schedule details will be provided</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; You'll begin your training journey!</td></tr>
        </table>
      </div>
      <p style="font-size: 0.9rem; color: #374151; margin: 0 0 1rem;">If you have any questions, feel free to reply to this email or contact us at <a href="mailto:info@blackboxtech.online" style="color: #fb4545dc; text-decoration: none;">info@blackboxtech.online</a></p>
      <p style="font-size: 0.9rem; color: #374151; margin: 0;">Best regards,<br/><strong>The BlackBox Tech Team</strong></p>
    </div>
    ${emailFooter()}
  `);
}

function buildSoftwareConfirmation(data: Record<string, unknown>) {
  return wrapEmail(`
    ${emailHeader("Project Request Received!", GRADIENTS.build)}
    <div style="background: #f9fafb; padding: 1.75rem 2rem;">
      <p style="font-size: 1rem; color: #374151; margin: 0 0 1rem;">Hi ${data.fullName},</p>
      <p style="font-size: 0.95rem; color: #374151; line-height: 1.7; margin: 0 0 1.25rem;">Thank you for reaching out to BlackBox Tech about your project${data.companyName ? ` at <strong>${data.companyName}</strong>` : ""}. We've received your project request and our team will review it shortly.</p>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1.25rem;">
        <p style="font-size: 0.9rem; color: #374151; font-weight: 700; margin: 0 0 0.75rem;">What happens next:</p>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Our team will review your project requirements</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; We'll reach out within 48 hours to discuss your project</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; We'll provide a detailed proposal and timeline</td></tr>
          <tr><td style="padding: 0.3rem 0; font-size: 0.9rem; color: #374151;">&#10003; Once approved, we'll begin development!</td></tr>
        </table>
      </div>
      <p style="font-size: 0.9rem; color: #374151; margin: 0 0 1rem;">If you have any questions or need to update your request, feel free to reply to this email or contact us at <a href="mailto:info@blackboxtech.online" style="color: #fb4545dc; text-decoration: none;">info@blackboxtech.online</a></p>
      <p style="font-size: 0.9rem; color: #374151; margin: 0;">Best regards,<br/><strong>The BlackBox Tech Team</strong></p>
    </div>
    ${emailFooter()}
  `);
}
