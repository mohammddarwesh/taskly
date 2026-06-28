"use client";

export function TaskDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 h-full">
      <div className="space-y-2">
        <div className="h-4 bg-[#D7E2FF] rounded w-1/4" />
        <div className="h-8 bg-[#D7E2FF] rounded w-3/4" />
      </div>
      <div className="h-24 bg-[#D7E2FF] rounded w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="h-6 bg-[#D7E2FF] rounded w-1/2" />
          <div className="h-6 bg-[#D7E2FF] rounded w-1/3" />
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-[#D7E2FF] rounded w-1/2" />
          <div className="h-6 bg-[#D7E2FF] rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}