import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const BUCKET = "build-files";
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files: File[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === "files" && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];
    const uploadedNames: string[] = [];

    for (const file of files) {
      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 10MB limit` },
          { status: 400 }
        );
      }

      // Create unique filename: timestamp-random-originalname
      const ext = file.name.split(".").pop();
      const baseName = file.name.replace(`.${ext}`, "").replace(/[^a-zA-Z0-9]/g, "_");
      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${baseName}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(uniqueName, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return NextResponse.json(
          { error: `Failed to upload "${file.name}": ${uploadError.message}` },
          { status: 500 }
        );
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(uniqueName);

      uploadedUrls.push(urlData.publicUrl);
      uploadedNames.push(file.name);
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      names: uploadedNames,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
