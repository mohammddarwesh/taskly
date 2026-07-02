import { InvitePageContent } from "@/features/invite/components/InvitePageContent";
import { InviteLoadingState } from "@/features/invite/components/InvitePageContent/InviteLoadingState";
import { Suspense } from "react";

export default function InvitePage() {
  return (
    <Suspense fallback={<InviteLoadingState />}>
      <InvitePageContent />
    </Suspense>
  );
}
