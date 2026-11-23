import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabase, IMAGE_BUCKET } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// File types we accept, and the extension we save them with.
// (SVG is left out on purpose because it can contain scripts.)
const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

// Vercel limits request bodies to about 4.5 MB, so stay under that.
const MAX_BYTES = 4 * 1024 * 1024;

// POST /api/admin/upload  (multipart form with a "file" field) -> { url }
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured (see README)." },
      { status: 500 }
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const extension = ALLOWED[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WebP, GIF or PDF files are allowed." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is too large (max 4 MB)." }, { status: 400 });
  }

  // Random file name so uploads never overwrite each other
  const path = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, bytes, { contentType: file.type, cacheControl: "31536000" });

  if (error) {
    return NextResponse.json(
      { error: `Upload failed: ${error.message}. Check that the "${IMAGE_BUCKET}" bucket exists.` },
      { status: 500 }
    );
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
