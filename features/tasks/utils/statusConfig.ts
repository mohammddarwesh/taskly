import { TaskStatus } from "../types/task.types";

export const statusConfig = {
  [TaskStatus.TO_DO]: {
    dotColor: "bg-[#737685]",
    borderColor: "border-l-[#737685]",
  },
  [TaskStatus.IN_PROGRESS]: {
    dotColor: "bg-[#0052CC]",
    borderColor: "border-l-[#0052CC]",
  },
  [TaskStatus.BLOCKED]: {
    dotColor: "bg-[#BA1A1A]",
    borderColor: "border-l-[#BA1A1A]",
  },
  [TaskStatus.IN_REVIEW]: {
    dotColor: "bg-[#9B59B6]",
    borderColor: "border-l-[#9B59B6]",
  },
  [TaskStatus.READY_FOR_QA]: {
    dotColor: "bg-[#E67E22]",
    borderColor: "border-l-[#E67E22]",
  },
  [TaskStatus.REOPENED]: {
    dotColor: "bg-[#D35400]",
    borderColor: "border-l-[#D35400]",
  },
  [TaskStatus.READY_FOR_PRODUCTION]: {
    dotColor: "bg-[#27AE60]",
    borderColor: "border-l-[#27AE60]",
  },
  [TaskStatus.DONE]: {
    dotColor: "bg-[#2ECC71]",
    borderColor: "border-l-[#2ECC71]",
  },
};
