import { notFound } from "next/navigation";
import Head from "@/components/ui/Head";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CreateTaskForm } from "@/features/tasks/components/CreateTaskForm";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function CreateTaskPage({ params }: PageProps) {
  const { projectId } = await params;

  if (!projectId) {
    notFound();
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Breadcrumbs />
      <Head
        head="Create New Task"
        sub="Initialize a new work item within the Architectural Workspace ecosystem."
        className="pt-6 pb-10"
      />
      <CreateTaskForm projectId={projectId} />
    </div>
  );
}
