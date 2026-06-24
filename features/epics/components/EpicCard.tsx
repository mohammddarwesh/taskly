"use client";

import { Epic } from "../types/epic.types";
import { formatDate } from "@/libs/utils";
import Image from "next/image";

interface Props {
  epic: Epic;
  onClick?: () => void; 
}

export function EpicCard({ epic, onClick }: Props) {
  const assigneeName = epic.assignee?.name || "Unassigned";

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-[#65DCA4]",
      "bg-[#B2C5FF]",
      "bg-[#82F9BE]",
      "bg-[#DAE2FF]",
      "bg-[#D6E3FF]",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const avatarColor = getAvatarColor(assigneeName);

  return (
    <div
      className="flex flex-col justify-between p-4 bg-white border-l-4 border-[#004E32] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-lg cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="inline-flex items-center px-2.5 py-1 bg-[#82F9BE] text-[#005235] text-[10px] font-bold uppercase rounded-sm tracking-[0.5px]">
          {epic.epic_id}
        </span>
        <button
          className="w-4 h-4 flex items-center justify-center text-[rgba(4,27,60,0.2)] hover:text-[#041B3C] transition-colors"
          aria-label="Epic actions"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <Image src="/icons/more-vertical.svg" alt="More" width={4} height={16} />
        </button>
      </div>

      <h3 className="text-xl font-semibold text-[#041B3C] leading-7 mb-3">
        {epic.title}
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-xl ${avatarColor}`}
            >
              <span className="text-sm font-bold text-[#002113]">
                {getInitials(assigneeName)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-[#434654]">Assignee</span>
              <span className="text-sm font-semibold text-[#041B3C]">
                {assigneeName}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#F1F3FF] pt-3 mt-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/edit-pencil.svg"
                alt="Created by"
                width={11.08}
                height={9.92}
                className="opacity-80"
              />
              <span className="text-[11px] font-normal text-[rgba(67,70,84,0.8)]">
                Created by{" "}
                <span className="font-medium text-[#041B3C]">
                  {epic.created_by.name}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/icons/calendar.svg"
                alt="Date"
                width={10.5}
                height={11.67}
                className="opacity-80"
              />
              <span className="text-[11px] font-normal text-[rgba(67,70,84,0.8)]">
                {formatDate(epic.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}