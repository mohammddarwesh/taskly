import { AddMember } from "@/components/icons/AddMember";
import Image from "next/image";

type Props = {
  onClose: () => void;
};

export function InviteMemberHeader({ onClose }: Props) {
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-3">
        <div className="w-12 h-12 rounded-xl  text-primary bg-[#EBF0FF] flex items-center justify-center">
          <AddMember className="text-primary fill-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-[#041B3C] tracking-[-0.5px]">
            Invite Team Member
          </h2>
          <p className="text-[15px] text-[#434654] leading-6">
            Send an invitation to join the Architectural Studio workspace.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-[#434654] hover:text-[#041B3C] transition-colors p-1"
        aria-label="Close modal"
      >
        <Image src="/icons/x.svg" width={24} height={24} alt="Close" />
      </button>
    </div>
  );
}
