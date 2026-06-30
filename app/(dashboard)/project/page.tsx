import { Suspense } from "react";
import ProjectsPage from "@/features/projects/components/ProjectsPage";

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading projects...</div>}>
      <ProjectsPage />
    </Suspense>
  );
}
