// lib/redirect-utils.ts

/**
 * التحقق من أن الرابط آمن (داخلي وليس خبيث)
 */
export function isSafeRedirect(url: string): boolean {
  // منع الروابط الخارجية المطلقة
  if (url.includes("://") || url.startsWith("//")) {
    return false;
  }
  
  // منع البروتوكولات الخبيثة
  if (/^(javascript|data|file):/i.test(url)) {
    return false;
  }
  
  // منع محاولات الصعود للمجلدات العليا أو الهروب
  if (url.includes("..") || url.includes("\\")) {
    return false;
  }
  
  // السماح فقط بالمسارات التي تبدأ بـ / (داخل الموقع)
  if (!url.startsWith("/")) {
    return false;
  }
  
  return true;
}

/**
 * الحصول على رابط إعادة التوجيه من URL params أو sessionStorage
 */
export function getRedirectUrl(searchParams: URLSearchParams): string {
  const redirectParam = searchParams.get("redirect");
  
  if (redirectParam && isSafeRedirect(redirectParam)) {
    sessionStorage.setItem("redirectAfterAuth", redirectParam);
    return redirectParam;
  }
  
  const savedRedirect = sessionStorage.getItem("redirectAfterAuth");
  if (savedRedirect && isSafeRedirect(savedRedirect)) {
    return savedRedirect;
  }
  
  return "/";
}

/**
 * تنظيف رابط إعادة التوجيه بعد الاستخدام
 */
export function clearRedirect(): void {
  sessionStorage.removeItem("redirectAfterAuth");
}

/**
 * إنشاء رابط لصفحات المصادقة (login/signup) مع الحفاظ على معامل redirect
 */
export function getAuthLink(path: string, currentRedirect: string): { pathname: string; query?: { redirect: string } } {
  const safeRedirect = isSafeRedirect(currentRedirect) ? currentRedirect : "/";
  return {
    pathname: path,
    query: safeRedirect !== "/" ? { redirect: safeRedirect } : undefined,
  };
}