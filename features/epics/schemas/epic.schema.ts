import { z } from 'zod';

export const epicFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional().or(z.literal('')),
  assignee_id: z.string().optional().nullable(),
  deadline: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) => {
        if (!val) return true;
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: 'Deadline must be today or a future date' }
    ),
});

export type EpicFormValues = z.infer<typeof epicFormSchema>;