import { TaskStatus } from "../types/task.types";

export const statusConfig = {
  [TaskStatus.TO_DO]: {
    dotColor: "bg-[#737685]",
    borderColor: "border-l-[#737685]",
    bg: "bg-[#F3F4F6]",
    text: "text-[#4B5563]",
  },
  [TaskStatus.IN_PROGRESS]: {
    dotColor: "bg-[#0052CC]",
    borderColor: "border-l-[#0052CC]",
    bg: "bg-[#E8EDFF]",
    text: "text-[#0052CC]",
  },
  [TaskStatus.BLOCKED]: {
    dotColor: "bg-[#BA1A1A]",
    borderColor: "border-l-[#BA1A1A]",
    bg: "bg-[#FFEBEE]",
    text: "text-[#C62828]",
  },
  [TaskStatus.IN_REVIEW]: {
    dotColor: "bg-[#9B59B6]",
    borderColor: "border-l-[#9B59B6]",
    bg: "bg-[#FFF3E0]",
    text: "text-[#E65100]",
  },
  [TaskStatus.READY_FOR_QA]: {
    dotColor: "bg-[#E67E22]",
    borderColor: "border-l-[#E67E22]",
    bg: "bg-[#E8F5E9]",
    text: "text-[#2E7D32]",
  },
  [TaskStatus.REOPENED]: {
    dotColor: "bg-[#D35400]",
    borderColor: "border-l-[#D35400]",
    bg: "bg-[#FCE4EC]",
    text: "text-[#C62828]",
  },
  [TaskStatus.READY_FOR_PRODUCTION]: {
    dotColor: "bg-[#27AE60]",
    borderColor: "border-l-[#27AE60]",
    bg: "bg-[#E8F5E9]",
    text: "text-[#2E7D32]",
  },
  [TaskStatus.DONE]: {
    dotColor: "bg-[#2ECC71]",
    borderColor: "border-l-[#2ECC71]",
    bg: "bg-[#82F9BE]",
    text: "text-[#002113]",
  },
};
