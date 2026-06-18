import EditProjectForm from "@/features/projects/components/EditProjectForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { projectId } = await params;
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <Breadcrumbs />
        <div className="flex justify-center pb-16 pt-8">
          <EditProjectForm projectId={projectId} />
        </div>
      </div>
    </div>
  );
}
