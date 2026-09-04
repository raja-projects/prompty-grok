import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Prompty — private", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.byteLength !== bb.byteLength) {
    let diff = ab.byteLength ^ bb.byteLength;
    const n = Math.min(ab.byteLength, bb.byteLength);
    for (let i = 0; i < n; i++) diff |= ab[i]! ^ bb[i]!;
    return false;
  }
  let out = 0;
  for (let i = 0; i < ab.byteLength; i++) out |= ab[i]! ^ bb[i]!;
  return out === 0;
}

export function middleware(req: NextRequest) {
  const expectedUser = process.env.SITE_AUTH_USER ?? "";
  const expectedPass = process.env.SITE_AUTH_PASSWORD ?? "";

  const lockEnabled =
    (expectedUser.length > 0 && expectedPass.length > 0) ||
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL === "1";

  if (!lockEnabled) {
    return NextResponse.next();
  }

  if (!expectedUser || !expectedPass || expectedPass.length < 24) {
    return new NextResponse(
      "Site lock misconfigured: set SITE_AUTH_USER and a strong SITE_AUTH_PASSWORD (24+ chars).",
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return unauthorized();
  }

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const colon = decoded.indexOf(":");
  if (colon < 0) return unauthorized();
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);

  const userOk = timingSafeEqualStr(user, expectedUser);
  const passOk = timingSafeEqualStr(pass, expectedPass);
  if (!userOk || !passOk) return unauthorized();

  return NextResponse.next();
}
