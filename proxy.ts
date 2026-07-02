import { NextRequest, NextResponse } from "next/server";
import { accessTokenStr, refreshTokenStr } from "./constants";

type JwtPayload = {
  exp?: number;
  sub?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
};

const PROTECTED_PATHS = [
  "/dashboard",
  "/projects",
  "/project",
  "/epics",
  "/members",
  "/settings",
  "/invite",
];

const AUTH_PATHS = ["/login", "/sign-up"];

const REFRESH_TIMEOUT_MS = 5000;

function matchesPath(pathname: string, base: string): boolean {
  return pathname === base || pathname.startsWith(base + "/");
}

function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = Buffer.from(parts[1], "base64url").toString("utf-8");
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

function extractSetCookies(res: Response): string[] {
  if (typeof res.headers.getSetCookie === "function") {
    return res.headers.getSetCookie();
  }
  const single = res.headers.get("set-cookie");
  return single ? [single] : [];
}

function extractCookieValue(setCookies: string[], name: string): string | null {
  for (const raw of setCookies) {
    const pair = raw.split(";")[0];
    const eq = pair.indexOf("=");
    if (eq === -1) continue;
    if (pair.slice(0, eq).trim() === name) {
      return pair.slice(eq + 1).trim();
    }
  }
  return null;
}

function withUpdatedCookie(cookieHeader: string, name: string, value: string): string {
  const parts = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean)
    .filter((c) => !c.startsWith(`${name}=`));
  parts.push(`${name}=${value}`);
  return parts.join("; ");
}

function redirectToLogin(request: NextRequest): NextResponse {
  const redirectURL = new URL("/login", request.url);
  const relativeDestination = request.nextUrl.pathname + request.nextUrl.search;
  redirectURL.searchParams.set("redirect", relativeDestination);
  return NextResponse.redirect(redirectURL);
}

function clearAuthCookies(response: NextResponse): NextResponse {
  response.cookies.delete(accessTokenStr);
  response.cookies.delete(refreshTokenStr);
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(accessTokenStr)?.value;
  const refreshToken = request.cookies.get(refreshTokenStr)?.value;

  if (accessToken && AUTH_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const isProtected = PROTECTED_PATHS.some((p) => matchesPath(pathname, p));

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return redirectToLogin(request);
  }

  const payload = parseJwtPayload(accessToken);
  const now = Math.floor(Date.now() / 1000);
  const isExpired = !payload?.exp || payload.exp < now;

  if (!isExpired) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return clearAuthCookies(redirectToLogin(request));
  }

  let refreshRes: Response;
  try {
    const refreshUrl = new URL("/api/auth/refresh", request.url);
    refreshRes = await fetch(refreshUrl.toString(), {
      method: "POST",
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
      signal: AbortSignal.timeout(REFRESH_TIMEOUT_MS),
    });
  } catch {
    return clearAuthCookies(redirectToLogin(request));
  }

  if (!refreshRes.ok) {
    if (refreshRes.status === 401) {
      return clearAuthCookies(redirectToLogin(request));
    }
    return redirectToLogin(request);
  }

  const setCookies = extractSetCookies(refreshRes);
  const newAccessToken = extractCookieValue(setCookies, accessTokenStr);

  const requestHeaders = new Headers(request.headers);
  if (newAccessToken) {
    const updatedCookieHeader = withUpdatedCookie(
      request.headers.get("cookie") || "",
      accessTokenStr,
      newAccessToken
    );
    requestHeaders.set("cookie", updatedCookieHeader);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  setCookies.forEach((cookie) => {
    response.headers.append("set-cookie", cookie);
  });

  return response;
}