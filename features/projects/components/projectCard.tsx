import { formatDate } from "@/libs/utils";
import { Project } from "../types/project.types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/project/${project.id}/edit`);
  };

  return (
    <Link
      href={`/project/${project.id}/epics`}
      className="card flex flex-col justify-between min-h-55 p-6! gap-7 
                bg-white rounded-lg border border-slate-300/10 
                shadow-sm hover:shadow-md transition-shadow relative group"
    >
      {/* Edit button */}
      <button
        onClick={handleEdit}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white cursor-pointer text-slate-400 hover:text-slate-700 transition-colors shadow-sm border border-slate-200/50 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Edit project"
      >
        <Image src="/icons/edit-pencil.svg" alt="Edit" width={16} height={16} />
      </button>

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
    </Link>
  );
}
