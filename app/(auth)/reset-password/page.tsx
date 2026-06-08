"use client";

import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";
import { useRecoverySession } from "@/features/auth/hooks/useRecoverySession";
import Link from "next/link";

export default function ResetPasswordPage() {
  const { accessToken, isValidRecovery } = useRecoverySession();
  if (!isValidRecovery || !accessToken) {
    return (
      <div role="alert" className="text-red-600">
        <h2>invalid Link or expired</h2>
        <p>
          ypu can get a new link from{" "}
          <Link href="/forgot-password">Forgot passwprd</Link> page
        </p>
      </div>
    );
  }
  return <ResetPasswordForm accessToken={accessToken} />;
}
