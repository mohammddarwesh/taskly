import { formatDate } from "@/libs/utils";
import { Project } from "../types/project.types";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <div
      className="card flex flex-col justify-between min-h-55 p-6! gap-7 
                    bg-white rounded-lg border border-slate-300/10 
                    shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium leading-7 text-slate-900">
          {project.name}
        </h3>
        <p className="text-sm leading-5.75 text-slate-300 line-clamp-3">
          {project.description || "No description"}
        </p>
      </div>

      <div className="flex flex-col gap-1 pt-4 border-t border-[rgba(195,198,214,0.1)]">
        <span className="text-[11px] font-bold uppercase tracking-[-0.55px] text-[#737685]">
          CREATED AT
        </span>
        <span className="text-sm font-medium text-slate-300">
          {formatDate(project.created_at)}
        </span>
      </div>
    </div>
  );
}
