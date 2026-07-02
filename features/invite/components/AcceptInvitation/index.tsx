"use client";

import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useAcceptInvitation } from "@/features/invite/hooks/useAcceptInvitation";

type Props = {
  token: string;
};

export function AcceptInvitationCard({ token }: Props) {
  const { acceptInvitation, loading, error } = useAcceptInvitation();

  const handleAccept = () => {
    acceptInvitation(token);
  };

  return (
    <div className="max-w-lg w-full mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center border-t-4 border-primary relative overflow-hidden">
      <div className="flex justify-center mb-6">
        <Logo className="text-2xl" />
      </div>
      <div className="mb-4 inline-flex items-center gap-2 bg-primary-container/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
        <span>✦</span> New Project Invitation
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        You&apos;ve been invited to join new project
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <Button
        variant="primary"
        className="w-full py-3 text-base"
        onClick={handleAccept}
        loading={loading}
      >
        Accept Invitation
      </Button>
    </div>
  );
}
