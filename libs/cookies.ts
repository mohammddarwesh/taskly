// lib/cookies.ts
import { NextResponse } from 'next/server';

// ============================================
// Types
// ============================================

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

interface SetTokenCookiesOptions {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  rememberMe?: boolean;
  // Ability to override default cookie settings
  accessTokenOptions?: Partial<CookieOptions>;
  refreshTokenOptions?: Partial<CookieOptions>;
}

// ============================================
// Default Configurations
// ============================================

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

const DEFAULT_REFRESH_MAX_AGE = {
  rememberMe: 60 * 60 * 24 * 30, // 30 days
  default: 60 * 60 * 24, // 24 hours
};

// ============================================
// Helper Functions for Building Options
// ============================================

/**
 * Build access_token cookie options
 * @param expiresAt - Expiration timestamp from Supabase
 * @param overrides - Additional options to override defaults
 */
function buildAccessTokenOptions(
  expiresAt: number,
  overrides?: Partial<CookieOptions>
): CookieOptions {
  return {
    ...DEFAULT_COOKIE_OPTIONS,
    expires: new Date(expiresAt * 1000),
    ...overrides,
  };
}

/**
 * Build refresh_token cookie options
 * @param rememberMe - Whether user wants to stay logged in
 * @param overrides - Additional options to override defaults
 */
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

// ============================================
// Main Functions
// ============================================

/**
 * Set token cookies in the response
 * 
 * @example
 * // Basic usage
 * setTokenCookies(response, data, true);
 * 
 * @example
 * // Override only access_token settings
 * setTokenCookies(response, data, true, {
 *   accessTokenOptions: { path: '/api' }
 * });
 * 
 * @example
 * // Override both tokens
 * setTokenCookies(response, data, true, {
 *   accessTokenOptions: { sameSite: 'strict' },
 *   refreshTokenOptions: { maxAge: 60 * 60 } // 1 hour
 * });
 */
export function setTokenCookies(
  response: NextResponse,
  tokens: Tokens,
  rememberMe: boolean = false,
  options?: {
    accessTokenOptions?: Partial<CookieOptions>;
    refreshTokenOptions?: Partial<CookieOptions>;
  }
): void {
  // Set access_token
  const accessTokenOptions = buildAccessTokenOptions(
    tokens.expires_at,
    options?.accessTokenOptions
  );
  response.cookies.set('access_token', tokens.access_token, accessTokenOptions);

  // Set refresh_token
  const refreshTokenOptions = buildRefreshTokenOptions(
    rememberMe,
    options?.refreshTokenOptions
  );
  response.cookies.set('refresh_token', tokens.refresh_token, refreshTokenOptions);
}

/**
 * Set a custom cookie (general purpose)
 * 
 * @example
 * setCookie(response, 'theme', 'dark', { maxAge: 60 * 60 * 24 * 30 });
 */
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

/**
 * Clear token cookies (logout)
 * 
 * @example
 * clearTokenCookies(response);
 * 
 * @example
 * // Clear with additional cookies
 * clearTokenCookies(response, ['session_id', 'temp_token']);
 */
export function clearTokenCookies(
  response: NextResponse,
  additionalCookies: string[] = []
): void {
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  
  additionalCookies.forEach(cookie => {
    response.cookies.delete(cookie);
  });
}

/**
 * Set redirect cookie to preserve the intended destination
 * 
 * @example
 * setRedirectCookie(response, '/dashboard/projects');
 * 
 * @example
 * // Override default duration (5 minutes)
 * setRedirectCookie(response, '/dashboard/projects', { maxAge: 60 }); // 1 minute
 */
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
    maxAge: 60 * 5, // 5 minutes default
  };

  response.cookies.set('redirect_after_login', redirectTo, {
    ...defaultOptions,
    ...options,
  });
}

/**
 * Read a cookie from the request
 * 
 * @example
 * const token = getCookie(request, 'access_token');
 */
export function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Read all cookies from the request
 * 
 * @example
 * const allCookies = getAllCookies(request);
 * console.log(allCookies.access_token);
 */
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

/**
 * Get the saved redirect cookie
 * 
 * @example
 * const redirect = getRedirectCookie(request);
 * if (redirect) console.log('Will redirect to:', redirect);
 */
export function getRedirectCookie(request: Request): string | null {
  return getCookie(request, 'redirect_after_login');
}

// ============================================
// Advanced: Update Default Configurations (for large projects)
// ============================================

/**
 * Update default cookie configurations (optional usage)
 * 
 * @example
 * // In app initialization file
 * configureCookieDefaults({
 *   defaultOptions: { sameSite: 'strict' },
 *   refreshMaxAge: { rememberMe: 60 * 60 * 24 * 60 } // 60 days
 * });
 */
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