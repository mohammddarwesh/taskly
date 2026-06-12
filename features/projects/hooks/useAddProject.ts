import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProjectSchema, AddProjectFormValues } from '../schemas/add-project.schema';
import { createProject } from '../services/project.service';
import { isApiError } from '@/types/apiError.types';
import { toast } from 'react-toastify';

export function useAddProject() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<AddProjectFormValues>({
        resolver: zodResolver(addProjectSchema),
        defaultValues: { name: '', description: '' },
    });

    const onSubmit = useCallback(
        async (values: AddProjectFormValues) => {
            setIsSubmitting(true);
            try {
                await createProject(values);
                form.reset();
                toast.success('Project created successfully');
            } catch (err: unknown) {
                const message = isApiError(err) ? err.msg : 'Something went wrong';
                toast.error(`Failed to create project: ${message}`);
            } finally {
                setIsSubmitting(false);
            }
        },
        [form],
    );

    return { form, isSubmitting, onSubmit: form.handleSubmit(onSubmit) };
}