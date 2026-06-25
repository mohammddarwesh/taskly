import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BoardHeader } from "@/features/tasks/components/BoardView/BoardHeader";
import { BoardView } from "@/features/tasks/components/BoardView";

interface PageProps {
  params: Promise<{ projectId: string }>;
  searchParams?: Promise<{ view?: string }>;
}

export default async function ProjectTasksPage({
  params,
  searchParams,
}: PageProps) {
  const { projectId } = await params;
  const { view = "board" } = (await searchParams) || {};

  if (!projectId) notFound();

  return (
    <div className="flex flex-col w-full h-full px-4 md:px-6 lg:px-8 pb-4">
      <Breadcrumbs />
      <div className="mt-4 flex-shrink-0">
        <BoardHeader view={view} projectId={projectId} />
      </div>

      <div className="flex-1 min-w-0 w-full h-full mt-2 relative">
        {view === "board" ? (
          <BoardView projectId={projectId} />
        ) : (
          <div className="flex justify-center py-20 text-[#434654]">
            List View coming soon...
          </div>
        )}
      </div>
    </div>
  );
}