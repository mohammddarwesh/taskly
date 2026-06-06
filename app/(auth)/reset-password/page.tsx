// app/(auth)/reset-password/page.tsx
"use client";

import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  // Lazy initializer: runs exactly once, on first render (client-side only)
  const [{ accessToken, isValid }] = useState(() => {
    // Guard against SSR (though "use client" helps, we keep safety)
    if (typeof window === "undefined") {
      return { accessToken: null, isValid: false };
    }

    // 1. Check query parameters
    const params = new URLSearchParams(window.location.search);
    let token = params.get("access_token");
    let type = params.get("type");

    if (token && type === "recovery") {
      return { accessToken: token, isValid: true };
    }

    // 2. Check hash fragment – but we won't redirect here (side effect)
    // We'll handle redirect in a separate useEffect that doesn't call setState.
    const hash = window.location.hash;
    if (hash && hash.includes("access_token") && hash.includes("type=recovery")) {
      const hashParams = new URLSearchParams(hash.slice(1));
      token = hashParams.get("access_token");
      type = hashParams.get("type");
      if (token && type === "recovery") {
        // We have a valid token from hash, but we'll redirect to clean URL.
        // Store token temporarily so we can show form after redirect.
        // However, redirect will happen immediately, so we return valid state.
        // The redirect effect will replace the URL before user sees anything.
        return { accessToken: token, isValid: true };
      }
    }

    return { accessToken: null, isValid: false };
  });

  // Separate effect for redirecting hash → query (no setState, only side effect)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.includes("access_token") && hash.includes("type=recovery")) {
      const hashParams = new URLSearchParams(hash.slice(1));
      const token = hashParams.get("access_token");
      const type = hashParams.get("type");
      if (token && type === "recovery") {
        const newUrl = `${window.location.pathname}?access_token=${encodeURIComponent(token)}&type=recovery`;
        window.location.replace(newUrl);
      }
    }
  }, []); // Empty deps, runs once, no setState

  if (!isValid) {
    return <div className="card p-4 text-center">Invalid or expired reset link.</div>;
  }

  return <ResetPasswordForm accessToken={accessToken!} />;
}