import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/resend";

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
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%); padding: 1.5rem; border-radius: 1rem 1rem 0 0;">
        <h2 style="color: #fff; margin: 0;">Student Training Registration</h2>
      </div>
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0 0 1rem 1rem; border: 1px solid #e5e7eb;">
        <h3 style="color: #374151; margin-top: 0;">Parent Details</h3>
        <p><strong>Name:</strong> ${data.parentName}</p>
        <p><strong>Email:</strong> ${data.parentEmail}</p>
        <p><strong>Phone:</strong> ${data.parentPhone}</p>
        <h3 style="color: #374151;">Child Details</h3>
        <p><strong>Name:</strong> ${data.childName}</p>
        <p><strong>Age:</strong> ${data.childAge}</p>
        <p><strong>Gender:</strong> ${data.childGender}</p>
        <p><strong>Level:</strong> ${data.childLevel}</p>
        <h3 style="color: #374151;">Training Preferences</h3>
        <p><strong>Programs:</strong> ${Array.isArray(data.programs) ? data.programs.join(", ") : data.programs}</p>
        <p><strong>Schedule:</strong> ${data.schedule}</p>
        <p><strong>Training Mode:</strong> ${data.trainingMode === "virtual" ? "Virtual (Online)" : "Physical (In-Person)"}</p>
        <p><strong>Payment Plan:</strong> ${data.paymentPlan}</p>
        <p><strong>Preferred Start:</strong> ${data.startDate}</p>
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
      </div>
    </div>`;
}

function buildProfessionalEmail(data: Record<string, unknown>) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #ddd7fd 0%, #fb4545dc 100%); padding: 1.5rem; border-radius: 1rem 1rem 0 0;">
        <h2 style="color: #fff; margin: 0;">Professional Training Registration</h2>
      </div>
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0 0 1rem 1rem; border: 1px solid #e5e7eb;">
        <h3 style="color: #374151; margin-top: 0;">Personal Details</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Date of Birth:</strong> ${data.dob}</p>
        <h3 style="color: #374151;">Professional Information</h3>
        <p><strong>Organization:</strong> ${data.organization || "N/A"}</p>
        <p><strong>Job Title:</strong> ${data.jobTitle || "N/A"}</p>
        <h3 style="color: #374151;">Training Preferences</h3>
        <p><strong>Programs:</strong> ${Array.isArray(data.programs) ? data.programs.join(", ") : data.programs}</p>
        <p><strong>Schedule:</strong> ${data.schedule}</p>
        <p><strong>Experience Level:</strong> ${data.experienceLevel}</p>
        <p><strong>Training Mode:</strong> ${data.trainingMode === "virtual" ? "Virtual (Online)" : "Physical (In-Person)"}</p>
        <p><strong>Payment Preference:</strong> ${data.paymentPreference}</p>
        ${data.additionalInfo ? `<p><strong>Additional Info:</strong> ${data.additionalInfo}</p>` : ""}
      </div>
    </div>`;
}

function buildSoftwareEmail(data: Record<string, unknown>) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #1b1b1b 0%, #374151 100%); padding: 1.5rem; border-radius: 1rem 1rem 0 0;">
        <h2 style="color: #fff; margin: 0;">Software Build Request</h2>
      </div>
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0 0 1rem 1rem; border: 1px solid #e5e7eb;">
        <h3 style="color: #374151; margin-top: 0;">Business Details</h3>
        <p><strong>Company:</strong> ${data.companyName}</p>
        <p><strong>Contact Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <h3 style="color: #374151;">Project Details</h3>
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        <p><strong>Budget Range:</strong> ${data.budget}</p>
        <p><strong>Expected Timeline:</strong> ${data.timeline}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        ${data.files ? `<p><strong>Attached Files:</strong> ${data.files}</p>` : ""}
        ${data.additionalRequirements ? `<p><strong>Additional Requirements:</strong> ${data.additionalRequirements}</p>` : ""}
      </div>
    </div>`;
}

// ─── Client confirmation email builders ────────────────────────────────────────

function buildStudentConfirmation(data: Record<string, unknown>) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #fb4545dc 0%, #ddd7fd 100%); padding: 1.5rem; border-radius: 1rem 1rem 0 0;">
        <h2 style="color: #fff; margin: 0;">Registration Received!</h2>
      </div>
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0 0 1rem 1rem; border: 1px solid #e5e7eb;">
        <p>Hi ${data.parentName},</p>
        <p>Thank you for registering <strong>${data.childName}</strong> for our student training programs at BlackBox Tech. We've received your registration and our team will contact you within 24 hours to confirm the schedule and provide payment details.</p>
        <p><strong>What happens next:</strong></p>
        <ol>
          <li>Our team will review your registration</li>
          <li>We'll contact you to confirm the schedule</li>
          <li>Payment details will be provided</li>
          <li>Your child will start learning!</li>
        </ol>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br/><strong>The BlackBox Tech Team</strong></p>
      </div>
    </div>`;
}

function buildProfessionalConfirmation(data: Record<string, unknown>) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #ddd7fd 0%, #fb4545dc 100%); padding: 1.5rem; border-radius: 1rem 1rem 0 0;">
        <h2 style="color: #fff; margin: 0;">Registration Received!</h2>
      </div>
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0 0 1rem 1rem; border: 1px solid #e5e7eb;">
        <p>Hi ${data.fullName},</p>
        <p>Thank you for registering for our professional training programs at BlackBox Tech. We've received your registration and our team will contact you within 24 hours.</p>
        <p><strong>What happens next:</strong></p>
        <ol>
          <li>Our team will review your registration and preferences</li>
          <li>We'll contact you to discuss the best program fit</li>
          <li>Payment and schedule details will be provided</li>
          <li>You'll begin your training journey!</li>
        </ol>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,<br/><strong>The BlackBox Tech Team</strong></p>
      </div>
    </div>`;
}

function buildSoftwareConfirmation(data: Record<string, unknown>) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
      <div style="background: linear-gradient(135deg, #1b1b1b 0%, #374151 100%); padding: 1.5rem; border-radius: 1rem 1rem 0 0;">
        <h2 style="color: #fff; margin: 0;">Project Request Received!</h2>
      </div>
      <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0 0 1rem 1rem; border: 1px solid #e5e7eb;">
        <p>Hi ${data.fullName},</p>
        <p>Thank you for reaching out to BlackBox Tech about your project${data.companyName ? ` at <strong>${data.companyName}</strong>` : ""}. We've received your project request and our team will review it shortly.</p>
        <p><strong>What happens next:</strong></p>
        <ol>
          <li>Our team will review your project requirements</li>
          <li>We'll reach out within 48 hours to discuss your project</li>
          <li>We'll provide a detailed proposal and timeline</li>
          <li>Once approved, we'll begin development!</li>
        </ol>
        <p>If you have any questions or need to update your request, feel free to reply to this email.</p>
        <p>Best regards,<br/><strong>The BlackBox Tech Team</strong></p>
      </div>
    </div>`;
}
