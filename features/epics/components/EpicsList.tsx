import { Epic } from "../types/epic.types";
import { EpicCard } from "./EpicCard";

interface EpicsListProps {
  epics: Epic[];
  onEpicClick?: (epic: Epic) => void;
}

export function EpicsList({ epics, onEpicClick }: EpicsListProps) {
  if (epics.length === 0) {
    return (
      <div className="text-center py-12 text-text-secondary">
        No epics found for this project.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {epics.map((epic) => (
        <EpicCard
          key={epic.id}
          epic={epic}
          onClick={() => onEpicClick?.(epic)}
        />
      ))}
    </div>
  );
}
