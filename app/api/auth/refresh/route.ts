import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '@/libs/api-client';
import { setTokenCookies, getRememberMeCookie } from '@/libs/cookies';
import { api_key, backendURL, refreshTokenStr } from '@/constants';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(refreshTokenStr)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  const rememberMe = getRememberMeCookie(request);

  try {
    const data = await apiClient<{
      access_token: string;
      refresh_token: string;
      expires_at: number;
    }>(`${backendURL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { apikey: api_key },
      body: { refresh_token: refreshToken },
    });

    const response = NextResponse.json({ success: true });

    setTokenCookies(response, data, rememberMe);

    return response;
  } catch (error) {
    console.error('Refresh error:', error);

    const status = (error as { status?: number })?.status;
    const isAuthRejection = status === 400 || status === 401;

    return NextResponse.json(
      { error: isAuthRejection ? 'Refresh failed' : 'Refresh unavailable' },
      { status: isAuthRejection ? 401 : 503 }
    );
  }
}