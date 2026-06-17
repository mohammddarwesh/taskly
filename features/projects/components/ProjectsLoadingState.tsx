import { LoadingSkeleton } from "./LoadingSkeleton";

interface ProjectsLoadingStateProps {
  count?: number;
}

export function ProjectsLoadingState({ count = 6 }: ProjectsLoadingStateProps) {
  return <LoadingSkeleton count={count} />;
}