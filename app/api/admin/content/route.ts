import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContent, saveContent, validateContent } from "@/lib/content";
import { getSupabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";
import type { SiteContent } from "@/lib/types";

export const dynamic = "force-dynamic";

// GET /api/admin/content -> current content (admin only)
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json({
    content,
    supabaseReady: getSupabase() !== null, // lets the admin page show a setup warning
  });
}

// POST /api/admin/content -> save everything (admin only)
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const problem = validateContent(body);
  if (problem) {
    return NextResponse.json({ error: problem }, { status: 400 });
  }

  try {
    await saveContent(body as SiteContent);
    revalidatePath("/", "layout"); // make sure every page shows the new content
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
