import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

const TABLE_MAP: Record<string, string> = {
  student: "blackbox_student_registrations",
  professional: "blackbox_professional_registrations",
  build: "blackbox_build_requests",
  contact: "blackbox_contact_messages",
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

    const { error } = await supabase.from(table).update(fields).eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Edit error:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}
