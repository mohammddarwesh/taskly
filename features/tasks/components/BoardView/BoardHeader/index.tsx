"use client";

import { useRouter } from "next/navigation";
import { BoardHeaderTitle } from "./BoardHeaderTitle";
import { BoardSearchInput } from "./BoardSearchInput";
import { BoardViewSwitcher } from "./BoardViewSwitcher";
import { BoardFilterButton } from "./BoardFilterButton";
import { BoardCreateTaskButton } from "./BoardCreateTaskButton";

interface BoardHeaderProps {
  view: string;
  projectId: string;
}

export function BoardHeader({ view, projectId }: BoardHeaderProps) {
  const router = useRouter();

  const handleCreateTask = () => {
    router.push(`/project/${projectId}/tasks/new`);
  };

  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-[#E8EDFF]">
      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="hidden md:flex justify-between items-center">
        <BoardHeaderTitle />
        <div className="flex items-center gap-3">
          <BoardSearchInput className="w-55" />
          <BoardViewSwitcher currentView={view} />
          <BoardFilterButton />
        </div>
      </div>

      {/* ================= MOBILE LAYOUT ================= */}
      <div className="flex flex-col md:hidden gap-3">
        <h1 className="text-[24px] font-semibold text-[#041B3C] tracking-[-0.5px]">
          Active Workboard
        </h1>
        <BoardSearchInput className="w-full" />
        <BoardCreateTaskButton onClick={handleCreateTask} />
      </div>
    </div>
  );
}
