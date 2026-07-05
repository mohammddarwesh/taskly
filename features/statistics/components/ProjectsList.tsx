"use client";

import { ProjectTaskCount } from "../types/statistics.types";

interface ProjectsListProps {
  projects: ProjectTaskCount[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-auto md:h-[350px]">
      <h3 className="text-lg font-bold text-gray-900 mb-4">All Projects</h3>
      <div className="flex-1 overflow-y-auto space-y-4">
        {projects.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm font-medium text-gray-400">
            No projects in this date range
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.project_id}
              className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-sm font-medium text-gray-700">
                {project.project_name}
              </span>
              <span className="text-sm font-bold text-gray-900">
                {project.tasks_count} Tasks
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
