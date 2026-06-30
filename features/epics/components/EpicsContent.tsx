import { Suspense } from "react";
import { EpicsContentInner } from "./EpicsContentInner";
import { EpicsLoadingSkeleton } from "./EpicsLoadingSkeleton";

interface Props {
  projectId: string;
}

export function EpicsContent({ projectId }: Props) {
  return (
    <Suspense fallback={<EpicsLoadingSkeleton />}>
      <EpicsContentInner projectId={projectId} />
    </Suspense>
  );
}
