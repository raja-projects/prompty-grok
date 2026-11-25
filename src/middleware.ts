import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  sessionCookieValid,
  timingSafeEqualStr,
} from "@/lib/site-auth";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

function redirectToLogin(req: NextRequest): NextResponse {
  const url = req.nextUrl.clone();
  const next = `${url.pathname}${url.search}`;
  url.pathname = "/login";
  url.search = next && next !== "/" ? `?next=${encodeURIComponent(next)}` : "";
  return NextResponse.redirect(url);
}

async function basicAuthOk(
  header: string | null,
  expectedUser: string,
  expectedPass: string,
): Promise<boolean> {
  if (!header?.startsWith("Basic ")) return false;
  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  const colon = decoded.indexOf(":");
  if (colon < 0) return false;
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);
  const userOk = await timingSafeEqualStr(user, expectedUser);
  const passOk = await timingSafeEqualStr(pass, expectedPass);
  return userOk && passOk;
}

export async function middleware(req: NextRequest) {
  // trim() removes stray spaces and quotes from the password file
  const expectedUser = (process.env.SITE_AUTH_USER ?? "").trim();
  const expectedPass = (process.env.SITE_AUTH_PASSWORD ?? "").trim();
  const { pathname } = req.nextUrl;

  const lockEnabled =
    (expectedUser.length > 0 && expectedPass.length > 0) ||
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL === "1";

  if (!lockEnabled) {
    return NextResponse.next();
  }

  if (!expectedUser || !expectedPass) {
    return new NextResponse(
      "Site lock misconfigured: set SITE_AUTH_USER and SITE_AUTH_PASSWORD.",
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const isLoginPage = pathname === "/login";
  const isLoginApi = pathname === "/api/login";
  const isLogoutApi = pathname === "/api/logout";

  if (isLoginApi || isLogoutApi) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(AUTH_COOKIE)?.value;
  const sessionOk = await sessionCookieValid(
    cookie,
    expectedUser,
    expectedPass,
  );
  const basicOk = await basicAuthOk(
    req.headers.get("authorization"),
    expectedUser,
    expectedPass,
  );
  const authed = sessionOk || basicOk;

  if (isLoginPage) {
    if (authed) {
      const dest = req.nextUrl.searchParams.get("next") || "/";
      const safe =
        dest.startsWith("/") && !dest.startsWith("//") ? dest : "/";
      return NextResponse.redirect(new URL(safe, req.url));
    }
    return NextResponse.next();
  }

  if (!authed) {
    return redirectToLogin(req);
  }

  return NextResponse.next();
}