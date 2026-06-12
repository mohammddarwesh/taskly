export function isSafeRedirect(url: string): boolean {
    if (url.includes("://") || url.startsWith("//")) {
        return false;
    }

    if (/^(javascript|data|file):/i.test(url)) {
        return false;
    }

    if (url.includes("..") || url.includes("\\")) {
        return false;
    }

    if (!url.startsWith("/")) {
        return false;
    }

    return true;
}

export function getRedirectUrl(searchParams: URLSearchParams): string {
    const redirectParam = searchParams.get("redirect");

    if (redirectParam && isSafeRedirect(redirectParam)) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem("redirectAfterAuth", redirectParam);
        }
        return redirectParam;

    }

    const savedRedirect = sessionStorage.getItem("redirectAfterAuth");
    if (savedRedirect && isSafeRedirect(savedRedirect)) {
        return savedRedirect;
    }

    return "/";
}

export function clearRedirect(): void {
    sessionStorage.removeItem("redirectAfterAuth");
}

export function getAuthLink(path: string, currentRedirect: string): { pathname: string; query?: { redirect: string } } {
    const safeRedirect = isSafeRedirect(currentRedirect) ? currentRedirect : "/";
    return {
        pathname: path,
        query: safeRedirect !== "/" ? { redirect: safeRedirect } : undefined,
    };
}