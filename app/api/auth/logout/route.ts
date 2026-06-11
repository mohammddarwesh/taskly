// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { clearTokenCookies } from '@/libs/cookies';

export async function POST() {
    const response = NextResponse.json({ success: true });
    clearTokenCookies(response);
    return response;
}