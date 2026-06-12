import { z } from 'zod';

export const addProjectSchema = z.object({
    name: z
        .string()
        .min(3, 'Project title must be at least 3 characters')
        .max(100, 'Project title must be at most 100 characters'),
    description: z
        .string()
        .max(500, 'Description must be at most 500 characters')
        .optional()
        .or(z.literal('')),
});

export type AddProjectFormValues = z.infer<typeof addProjectSchema>;