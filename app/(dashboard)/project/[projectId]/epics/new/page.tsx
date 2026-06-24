import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Head from "@/components/ui/Head";
import CreateEpicForm from "@/features/epics/components/CreateEpicForm";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function CreateEpicPage({ params }: PageProps) {
  const { projectId } = await params;

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto md:px-8">
        <Breadcrumbs />
        <Head
          head="Create New Epic"
          sub="Define a major project phase or high-level milestone to group
related tasks and track architectural progress."
          subClassName="max-w-[462.63]  text-wrap"
        />
        <div className="flex justify-center pb-16 pt-8">
          <CreateEpicForm projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
