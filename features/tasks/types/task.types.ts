export const TaskStatus = {
  TO_DO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  BLOCKED: 'BLOCKED',
  IN_REVIEW: 'IN_REVIEW',
  READY_FOR_QA: 'READY_FOR_QA',
  REOPENED: 'REOPENED',
  READY_FOR_PRODUCTION: 'READY_FOR_PRODUCTION',
  DONE: 'DONE',
} as const;

export type TaskStatusType = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface CreateTaskPayload {
  project_id: string;
  epic_id?: string | null;
  title: string;
  description?: string | null;
  assignee_id?: string | null;
  due_date?: string | null; // ISO string
  status?: TaskStatusType;
}

// Helper for UI dropdown display
export const STATUS_OPTIONS = Object.values(TaskStatus).map((status) => ({
  value: status,
  label: status.replace(/_/g, ' '),
}));