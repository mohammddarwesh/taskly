"use client";

import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { useMemo } from "react";

export default function ResetPasswordPage() {
  const { accessToken, isValid } = useMemo(() => {
    const hash = window.location.hash;

    const params = new URLSearchParams(
      hash.replace("#", "")
    );

    const token = params.get("access_token");
    const type = params.get("type");

    return {
      accessToken:
        type === "recovery" ? token : null,
      isValid:
        type === "recovery" && !!token,
    };
  }, []);

  if (!isValid) {
    return (
      <div className="card">
        Invalid or expired reset link
      </div>
    );
  }

  return (
    <ResetPasswordForm
      accessToken={accessToken!}
    />
  );
}