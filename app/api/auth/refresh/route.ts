// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/libs/api-client';
import { setTokenCookies } from '@/libs/cookies';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  const backendURL = process.env.BACKEND_URL;
  const apikey = process.env.API_KEY;

  try {
    const data = await apiClient<{
      access_token: string;
      refresh_token: string;
      expires_at: number;
    }>(`${backendURL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { apikey: apikey! },
      body: { refresh_token: refreshToken },
    });

    const response = NextResponse.json({ success: true });

    setTokenCookies(response, data, false);

    return response;
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
  }
}