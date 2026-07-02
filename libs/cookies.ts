import { accessTokenStr, refreshTokenStr } from '@/constants';
import { NextResponse } from 'next/server';

interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
  expires?: Date;
  maxAge?: number;
}

export const rememberMeStr = 'remember_me';
const CLOCK_SKEW_BUFFER_SECONDS = 5;

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

const DEFAULT_REFRESH_MAX_AGE = {
  rememberMe: 60 * 60 * 24 * 30,
  default: 60 * 60 * 24,
};

function buildAccessTokenOptions(
  expiresAt: number,
  overrides?: Partial<CookieOptions>
): CookieOptions {
  return {
    ...DEFAULT_COOKIE_OPTIONS,
    expires: new Date((expiresAt - CLOCK_SKEW_BUFFER_SECONDS) * 1000),
    ...overrides,
  };
}

function buildRefreshTokenOptions(
  rememberMe: boolean = false,
  overrides?: Partial<CookieOptions>
): CookieOptions {
  const maxAge = rememberMe
    ? DEFAULT_REFRESH_MAX_AGE.rememberMe
    : DEFAULT_REFRESH_MAX_AGE.default;

  return {
    ...DEFAULT_COOKIE_OPTIONS,
    maxAge,
    ...overrides,
  };
}

function buildRememberMeOptions(rememberMe: boolean): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: rememberMe
      ? DEFAULT_REFRESH_MAX_AGE.rememberMe
      : DEFAULT_REFRESH_MAX_AGE.default,
  };
}

export function setTokenCookies(
  response: NextResponse,
  tokens: Tokens,
  rememberMe: boolean = false,
  options?: {
    accessTokenOptions?: Partial<CookieOptions>;
    refreshTokenOptions?: Partial<CookieOptions>;
  }
): void {
  const accessTokenOptions = buildAccessTokenOptions(
    tokens.expires_at,
    options?.accessTokenOptions
  );
  response.cookies.set(accessTokenStr, tokens.access_token, accessTokenOptions);

  const refreshTokenOptions = buildRefreshTokenOptions(
    rememberMe,
    options?.refreshTokenOptions
  );
  response.cookies.set(refreshTokenStr, tokens.refresh_token, refreshTokenOptions);

  response.cookies.set(
    rememberMeStr,
    rememberMe ? 'true' : 'false',
    buildRememberMeOptions(rememberMe)
  );
}

export function setCookie(
  response: NextResponse,
  name: string,
  value: string,
  options?: Partial<CookieOptions>
): void {
  const finalOptions = {
    ...DEFAULT_COOKIE_OPTIONS,
    ...options,
  };
  response.cookies.set(name, value, finalOptions);
}

export function clearTokenCookies(
  response: NextResponse,
  additionalCookies: string[] = []
): void {
  response.cookies.delete(accessTokenStr);
  response.cookies.delete(refreshTokenStr);
  response.cookies.delete(rememberMeStr);

  additionalCookies.forEach(cookie => {
    response.cookies.delete(cookie);
  });
}

export function setRedirectCookie(
  response: NextResponse,
  redirectTo: string,
  options?: Partial<CookieOptions>
): void {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 5,
  };

  response.cookies.set('redirect_after_login', redirectTo, {
    ...defaultOptions,
    ...options,
  });
}

export function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('cookie') || '';
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getAllCookies(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies: Record<string, string> = {};

  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
}

export function getRedirectCookie(request: Request): string | null {
  return getCookie(request, 'redirect_after_login');
}

export function getRememberMeCookie(request: Request): boolean {
  return getCookie(request, rememberMeStr) === 'true';
}

export function configureCookieDefaults(config: {
  defaultOptions?: Partial<CookieOptions>;
  refreshMaxAge?: {
    rememberMe?: number;
    default?: number;
  };
}): void {
  if (config.defaultOptions) {
    Object.assign(DEFAULT_COOKIE_OPTIONS, config.defaultOptions);
  }
  if (config.refreshMaxAge) {
    if (config.refreshMaxAge.rememberMe) {
      DEFAULT_REFRESH_MAX_AGE.rememberMe = config.refreshMaxAge.rememberMe;
    }
    if (config.refreshMaxAge.default) {
      DEFAULT_REFRESH_MAX_AGE.default = config.refreshMaxAge.default;
    }
  }
}