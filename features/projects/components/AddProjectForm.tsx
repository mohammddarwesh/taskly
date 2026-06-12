'use client';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAddProject } from '../hooks/useAddProject';
import { cn } from '@/libs/utils';

export function AddProjectForm() {
    const { form, isSubmitting, onSubmit } = useAddProject();
    const { register, formState: { errors } } = form;

    return (
        <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-6">
            <Input
                label="Project Title"
                id="name"
                {...register('name')}
                error={errors.name?.message}
                placeholder="Enter project title"
                // required
            />

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium text-text-primary">
                    Description <span className="text-text-secondary">(optional)</span>
                </label>
                <textarea
                    id="description"
                    {...register('description')}
                    rows={4}
                    maxLength={500}
                    placeholder="Briefly describe the project"
                    className={cn(
                        'w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm',
                        'focus:outline-none focus:ring-2 focus:ring-ring',
                    )}
                />
                {errors.description && (
                    <p className="text-sm text-text-error">{errors.description.message}</p>
                )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
        </form>
    );
}