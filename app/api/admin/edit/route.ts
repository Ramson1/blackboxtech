import { NextRequest, NextResponse } from "next/server";
import { supabase, getSupabaseAdmin } from "@/lib/supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

const TABLE_MAP: Record<string, string> = {
  student: "blackbox_student_registrations",
  professional: "blackbox_professional_registrations",
  build: "blackbox_build_requests",
  contact: "blackbox_contact_messages",
  quote: "blackbox_quote_requests",
};

export async function PATCH(request: NextRequest) {
  const password = request.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, id, fields } = await request.json();

    if (!type || !id || !fields || typeof fields !== "object") {
      return NextResponse.json({ error: "type, id, and fields are required" }, { status: 400 });
    }

    const table = TABLE_MAP[type];
    if (!table) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // Service-role first: quote rows are not UPDATE-able under anon RLS.
    // jsonb/boolean columns are never sent by the edit modal (skipped client-side).
    const db = getSupabaseAdmin() ?? supabase;
    const { error } = await db.from(table).update(fields).eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Edit error:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}
