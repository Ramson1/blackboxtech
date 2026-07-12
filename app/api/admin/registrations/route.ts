import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

const TABLE_MAP: Record<string, string> = {
  student: "blackbox_student_registrations",
  professional: "blackbox_professional_registrations",
  build: "blackbox_build_requests",
  contact: "blackbox_contact_messages",
};

function verifyAdmin(request: NextRequest): boolean {
  const password = request.headers.get("x-admin-password");
  return password === ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const type = request.nextUrl.searchParams.get("type") || "all";

    const results: Record<string, unknown[]> = {};

    if (type === "all" || type === "student") {
      const { data } = await supabase
        .from("blackbox_student_registrations")
        .select("*")
        .order("created_at", { ascending: false });
      results.student = data || [];
    }

    if (type === "all" || type === "professional") {
      const { data } = await supabase
        .from("blackbox_professional_registrations")
        .select("*")
        .order("created_at", { ascending: false });
      results.professional = data || [];
    }

    if (type === "all" || type === "build") {
      const { data } = await supabase
        .from("blackbox_build_requests")
        .select("*")
        .order("created_at", { ascending: false });
      results.build = data || [];
    }

    if (type === "all" || type === "contact") {
      const { data } = await supabase
        .from("blackbox_contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      results.contact = data || [];
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Admin fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, id } = await request.json();
    if (!type || !id) {
      return NextResponse.json({ error: "type and id are required" }, { status: 400 });
    }

    const table = TABLE_MAP[type];
    if (!table) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
