export const TaskStatus = {
  TO_DO: "TO_DO",
  IN_PROGRESS: "IN_PROGRESS",
  BLOCKED: "BLOCKED",
  IN_REVIEW: "IN_REVIEW",
  READY_FOR_QA: "READY_FOR_QA",
  REOPENED: "REOPENED",
  READY_FOR_PRODUCTION: "READY_FOR_PRODUCTION",
  DONE: "DONE",
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  department: string | null;
}

export interface EpicInfo {
  id: string;
  title: string;
  epic_id: string;
}

export interface Task {
  id: string; // UUID
  project_id: string;
  epic_id: string | null;
  task_id: string; // "TASK-3"
  title: string;
  description: string | null;
  status: TaskStatusType;
  due_date: string | null; // ISO string
  created_at: string;
  epic: EpicInfo | null;
  created_by: UserInfo | null;
  assignee: UserInfo | null;
}

// Helper for UI dropdown display
export const STATUS_OPTIONS = Object.values(TaskStatus).map((status) => ({
  value: status,
  label: status.replace(/_/g, " "),
}));
