"use client";

import { useSyncExternalStore } from "react";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

function getTokenFromUrl() {
  if (typeof window === "undefined") {
    return { accessToken: null, isValid: false };
  }

  const params = new URLSearchParams(window.location.search);
  let token = params.get("access_token");
  let type = params.get("type");

  if (token && type === "recovery") {
    return { accessToken: token, isValid: true };
  }

  const hash = window.location.hash;
  if (hash && hash.includes("access_token")) {
    const hashParams = new URLSearchParams(hash.slice(1));
    token = hashParams.get("access_token");
    type = hashParams.get("type");
    if (token && type === "recovery") {
      const newUrl = `${window.location.pathname}?access_token=${encodeURIComponent(
        token
      )}&type=recovery`;
      window.location.replace(newUrl);
      return { accessToken: token, isValid: true };
    }
  }

  return { accessToken: null, isValid: false };
}

function subscribe() {
  return () => {};
}

export default function ResetPasswordPage() {
  const { accessToken, isValid } = useSyncExternalStore(
    subscribe,
    getTokenFromUrl,
    () => ({ accessToken: null, isValid: false }) // server snapshot
  );

  if (!isValid) {
    return <div className="card p-4 text-center">Invalid or expired reset link.</div>;
  }

  return <ResetPasswordForm accessToken={accessToken!} />;
}