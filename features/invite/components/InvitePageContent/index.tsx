"use client";

import { useSearchParams } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { InviteLoadingState } from "./InviteLoadingState";
import { InviteErrorState } from "./InviteErrorState";
import { AcceptInvitationCard } from "../AcceptInvitation";

export function InvitePageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <InviteLoadingState />;
  }

  if (!user) {
    return null;
  }

  if (!token) {
    return <InviteErrorState />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <AcceptInvitationCard token={token} />
    </div>
  );
}
