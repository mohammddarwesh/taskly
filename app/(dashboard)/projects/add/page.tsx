import { Metadata } from 'next';
import { AddProjectForm } from '@/features/projects/components/AddProjectForm';

export const metadata: Metadata = {
    title: 'Add Project',
    description: 'Create a new project',
};

export default function AddProjectPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-text-primary mb-8">Add Project</h1>
            <AddProjectForm />
        </div>
    );
}