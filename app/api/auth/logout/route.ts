import { NextRequest, NextResponse } from 'next/server';
import { clearTokenCookies } from '@/libs/cookies';
import { accessTokenStr, api_key, backendURL } from '@/constants';
import { apiClient } from '@/libs/api-client';

export async function POST(request: NextRequest) {
    const accessToken = request.cookies.get(accessTokenStr)?.value

    const response = NextResponse.json({ success: true });
    clearTokenCookies(response);
    try {
        if (accessToken) {
            await apiClient(`${backendURL}/auth/v1/logout`, {
                method: "POST",
                headers: {
                    apikey: api_key,
                    Authorization: `Bearer ${accessToken}`
                }
            })
        }
        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ success: false, msg: 'Logout failed' }, { status: 500 });
    }
}