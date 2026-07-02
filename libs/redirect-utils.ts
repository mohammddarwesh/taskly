export function isSafeRedirect(url: string): boolean {
    if (!url || typeof url !== "string") return false;

    let decoded: string;
    try {
        decoded = decodeURIComponent(url);
    } catch {
        return false;
    }

    if (!decoded.startsWith("/")) return false;
    if (decoded.startsWith("//")) return false;
    if (/^[a-z][a-z0-9+.-]*:/i.test(decoded)) return false;
    if (decoded.includes("\\")) return false;
    if (decoded.includes("..")) return false;
    if (/[\x00-\x1f\s]/.test(decoded)) return false;

    return true;
}

export function saveRedirect(redirect: string): void {
    if (typeof window === "undefined") return;
    if (!isSafeRedirect(redirect)) return;
    sessionStorage.setItem("redirectAfterAuth", redirect);
}

export function getRedirectUrl(searchParams: URLSearchParams): string {
    const redirectParam = searchParams.get("redirect");

    if (redirectParam && isSafeRedirect(redirectParam)) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("redirectAfterAuth", redirectParam);
        }
        return redirectParam;
    }

    if (typeof window === "undefined") return "/";

    const savedRedirect = sessionStorage.getItem("redirectAfterAuth");
    if (savedRedirect && isSafeRedirect(savedRedirect)) {
        return savedRedirect;
    }

    return "/";
}

export function clearRedirect(): void {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("redirectAfterAuth");
}

export function getAuthLink(
    path: string,
    currentRedirect: string
): { pathname: string; query?: { redirect: string } } {
    const safeRedirect = isSafeRedirect(currentRedirect) ? currentRedirect : "/";
    return {
        pathname: path,
        query: safeRedirect !== "/" ? { redirect: safeRedirect } : undefined,
    };
}