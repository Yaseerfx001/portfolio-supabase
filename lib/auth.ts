import crypto from "crypto";
import type { NextRequest } from "next/server";

// How the admin login works:
//  1. You type the password on /admin. It is sent to /api/admin/login.
//  2. The SERVER compares it with the ADMIN_PASSWORD environment variable.
//     (The password is never written in the code that goes to the browser.)
//  3. If it matches, the server sends back a signed cookie that expires after
//     8 hours. Every admin API route checks that cookie before doing anything.

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours, in seconds

function getSecret(): string {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

// True when the admin password has been set on the server.
export function authConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

// Hash both strings first so they are the same length, then compare safely
// (timingSafeEqual avoids leaking information through response timing).
export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

// Token looks like "1735000000000.abcdef..." (expiry time + signature)
export function createSessionToken(): string {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${expires}.${sign(expires)}`;
}

function tokenIsValid(token: string | undefined): boolean {
  if (!token || !getSecret()) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false; // expired

  const expected = sign(expires);
  if (signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

// Call this at the top of every admin API route.
export function isAdmin(req: NextRequest): boolean {
  return tokenIsValid(req.cookies.get(SESSION_COOKIE)?.value);
}
