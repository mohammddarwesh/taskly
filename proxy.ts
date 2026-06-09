import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";


type JwtPayload = {
    exp?: number;
    sub?: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
}
const PROTECTED_PATHS = [
    "/dashboard",
    "/projects",
    "/epics",
    "/members",
    "/settings",
];

const AUTH_PATHS = ["/login", "/sign-up"];

function parsJwtPayload(token: string): JwtPayload | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payload = Buffer.from(parts[1], "base64").toString();
        return JSON.parse(payload);
    } catch {
        return null;
    }
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("access_token")?.value;

    if (accessToken && AUTH_PATHS.includes(pathname))
        return NextResponse.redirect(new URL("/", request.url));

    const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))

    if (isProtected) {
        if (!accessToken) {
            const redirectURL = new URL('/login', request.url)
            redirectURL.searchParams.set('redirect', pathname)
            return NextResponse.redirect(redirectURL)
        }

        const payload = parsJwtPayload(accessToken)
        const now = Math.floor(Date.now() / 1000)
        if (payload?.exp && payload.exp < now) {
            const refreshUrl = new URL('/api/auth/refresh', request.url)
            const refreshRes = await fetch(refreshUrl.toString(), {
                method: "POST",
                headers: {
                    Cookie: request.headers.get('cookie') || ''
                }
            })
            if (refreshRes.ok) {
                const response = NextResponse.next()
                const setCookie = refreshRes.headers.get('set-cookie')
                if (setCookie) response.headers.set('set-cookie', setCookie)
                return response
            } else {
                const response = NextResponse.redirect(new URL('/login', request.url))
                response.cookies.delete('access_token')
                response.cookies.delete('refresh_token')
                return response
            }


        }


    }
    return NextResponse.next()
}
