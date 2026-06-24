import { z } from 'zod';
import { TaskStatus } from '../types/task.types';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  status: z.enum([
    TaskStatus.TO_DO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.BLOCKED,
    TaskStatus.IN_REVIEW,
    TaskStatus.READY_FOR_QA,
    TaskStatus.REOPENED,
    TaskStatus.READY_FOR_PRODUCTION,
    TaskStatus.DONE,
  ]),
  epic_id: z.string().optional().nullable(),
  assignee_id: z.string().optional().nullable(),
  due_date: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;