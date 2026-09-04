/** Shared site-lock helpers (Edge + Node). */

export const AUTH_COOKIE = "prompty_session";

const enc = new TextEncoder();

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]!);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Deterministic session token for the configured operator credentials. */
export async function makeSessionToken(
  user: string,
  password: string,
): Promise<string> {
  const key = await hmacKey(password);
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(`prompty-session:v1:${user}`),
  );
  return b64url(sig);
}

export async function timingSafeEqualStr(
  a: string,
  b: string,
): Promise<boolean> {
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

export async function credentialsMatch(
  user: string,
  pass: string,
  expectedUser: string,
  expectedPass: string,
): Promise<boolean> {
  const userOk = await timingSafeEqualStr(user, expectedUser);
  const passOk = await timingSafeEqualStr(pass, expectedPass);
  return userOk && passOk;
}

export async function sessionCookieValid(
  cookieValue: string | undefined,
  expectedUser: string,
  expectedPass: string,
): Promise<boolean> {
  if (!cookieValue) return false;
  const expected = await makeSessionToken(expectedUser, expectedPass);
  return timingSafeEqualStr(cookieValue, expected);
}
