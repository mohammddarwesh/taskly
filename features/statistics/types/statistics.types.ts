export type StatusCounts = {
    [key: string]: number;
};

export type DailyStats = {
    day: string;
    statuses: StatusCounts;
};

export type CalendarStatsResponse = {
    daily: DailyStats[];
    totals: StatusCounts;
    total_tasks: number;
    done_tasks: number;
    overdue_tasks: number;
};

export type ProjectTaskCount = {
    project_id: string;
    project_name: string;
    tasks_count: number;
};

export type TaskStatus =
    | 'TO_DO'
    | 'IN_PROGRESS'
    | 'BLOCKED'
    | 'IN_REVIEW'
    | 'READY_FOR_QA'
    | 'REOPENED'
    | 'READY_FOR_PRODUCTION'
    | 'DONE';


export const STATUS_LABELS: Record<TaskStatus, string> = {
    TO_DO: 'To Do',
    IN_PROGRESS: 'In Progress',
    BLOCKED: 'Blocked',
    IN_REVIEW: 'In Review',
    READY_FOR_QA: 'Ready For QA',
    REOPENED: 'Reopened',
    READY_FOR_PRODUCTION: 'Ready For Production',
    DONE: 'Done'
};

export const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = Object.entries(STATUS_LABELS).map(([value, label]) => ({
    value: value as TaskStatus,
    label,
}));