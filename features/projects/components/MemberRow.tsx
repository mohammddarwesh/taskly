import { ProjectMember } from "../types/project.types";
import { Avatar } from "@/components/ui/Avatar";
import Image from "next/image";

interface Props {
  member: ProjectMember;
}

export function MemberRow({ member }: Props) {
  const roleColorMap: Record<string, { bg: string; text: string }> = {
    Owner: { bg: "bg-icon!", text: "text-white!" },
    Admin: { bg: "bg-[#CDDDFF]!", text: "text-[#51617E]!" },
    Member: { bg: "bg-surface-highest!", text: "text-[#434654]!" },
    Viewer: { bg: "bg-surface-app!", text: "text-[#434654]!" },
  };

  const roleStyle = roleColorMap[member.role] || roleColorMap.Member;

  return (
    <tr className="h-[88.5px] border-t border-surface-app first:border-t-0">
      {/* Member Info */}
      <td className="px-8">
        <div className="flex items-center gap-4">
          <Avatar name={member.name} size="md" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-[#041B3C]">
              {member.name}
            </span>
            <span className="text-xs text-[#434654]">{member.email}</span>
          </div>
        </div>
      </td>

      {/* Role Badge */}
      <td className="px-8">
        <span className={`badge ${roleStyle.bg} ${roleStyle.text}`}>
          {member.role}
        </span>
      </td>

      {/* Actions */}
      <td className="px-8 text-right">
        <button
          className="w-4 h-4 inline-flex items-center justify-center text-[#434654] hover:text-[#041B3C] transition-colors"
          aria-label="Member actions"
        >
          <Image
            src="/icons/more-vertical.svg"
            alt="More"
            width={4}
            height={16}
          />
        </button>
      </td>
    </tr>
  );
}
