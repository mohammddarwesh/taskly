import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EpicHeader } from "@/features/epics/components/EpicHeader";
import FloatingPlusBtn from "@/components/ui/FloatingPlusBtn";
import { EpicsContent } from "@/features/epics/components/EpicsContent";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectEpicsPage({ params }: PageProps) {
  const { projectId } = await params;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto md:px-8 pt-8">
        <div className="hidden md:block">
          <Breadcrumbs />
        </div>
        <EpicHeader projectId={projectId} />
        <EpicsContent projectId={projectId} />
        <FloatingPlusBtn href={`/project/${projectId}/epics/new`} />
      </div>
    </div>
  );
}
