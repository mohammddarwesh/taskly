"use client";

import { useRouter } from "next/navigation";
import { BoardHeaderTitle } from "./BoardHeaderTitle";
import { BoardSearchInput } from "./BoardSearchInput";
import { BoardCreateTaskButton } from "./BoardCreateTaskButton";
import { BoardViewControls } from "./BoardViewControls";

interface BoardHeaderProps {
  view: string;
  projectId: string;
  inputValue: string;
  onSearchChange: (value: string) => void;
}

export function BoardHeader({
  view,
  projectId,
  inputValue,
  onSearchChange,
}: BoardHeaderProps) {
  const router = useRouter();
  const handleCreateTask = () => router.push(`/project/${projectId}/tasks/new`);

  return (
    <div className="flex flex-col gap-4 pb-6 border-b border-[#E8EDFF]">
      <div className="hidden md:flex justify-between items-center">
        <BoardHeaderTitle />
        <div className="flex items-center gap-3">
          <BoardSearchInput
            className="w-[220px]"
            value={inputValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <BoardViewControls view={view} projectId={projectId} />
        </div>
      </div>
      <div className="flex flex-col md:hidden gap-3">
        <h1 className="text-[24px] font-semibold text-[#041B3C] tracking-[-0.5px]">
          Active Workboard
        </h1>
        <BoardSearchInput
          className="w-full"
          value={inputValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <BoardCreateTaskButton onClick={handleCreateTask} />
      </div>
    </div>
  );
}
