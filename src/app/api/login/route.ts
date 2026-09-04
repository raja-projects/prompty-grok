import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  credentialsMatch,
  makeSessionToken,
} from "@/lib/site-auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const expectedUser = process.env.SITE_AUTH_USER ?? "";
  const expectedPass = process.env.SITE_AUTH_PASSWORD ?? "";

  if (!expectedUser || !expectedPass) {
    return NextResponse.json(
      { ok: false, error: "Site lock is not configured." },
      { status: 503 },
    );
  }

  let body: { username?: string; password?: string } = {};
  try {
    body = (await req.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  const ok = await credentialsMatch(
    username,
    password,
    expectedUser,
    expectedPass,
  );
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Wrong username or password." },
      { status: 401 },
    );
  }

  const token = await makeSessionToken(expectedUser, expectedPass);
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
