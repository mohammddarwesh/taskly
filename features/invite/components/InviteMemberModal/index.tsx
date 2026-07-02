"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { InviteMemberForm } from "./InviteMemberForm";

type Props = {
  projectId: string;
};

export function InviteMemberModal({ projectId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL is the source of truth
  const isOpen = searchParams.get("invite") === "true";

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("invite");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Modal isOpen={isOpen} hideHeader onClose={handleClose} className="pt-0">
      <InviteMemberForm projectId={projectId} onClose={handleClose} />
    </Modal>
  );
}
