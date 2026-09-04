import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/site-auth";

export const runtime = "edge";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: AUTH_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
