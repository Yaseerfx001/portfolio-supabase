import { NextRequest, NextResponse } from "next/server";
import {
  authConfigured,
  passwordMatches,
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

// POST /api/admin/login  with  { "password": "..." }
export async function POST(req: NextRequest) {
  if (!authConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not set on the server (see README)." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const ok = typeof body.password === "string" && passwordMatches(body.password);

  if (!ok) {
    // Small delay makes guessing passwords slower
    await new Promise((resolve) => setTimeout(resolve, 700));
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true, // JavaScript in the browser can't read this cookie
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
