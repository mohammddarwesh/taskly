"use client";
export function BoardHeaderTitle() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[28px] font-semibold text-[#041B3C] tracking-[-0.5px]">
        Active Workboard
      </h1>
      <p className="text-[14px] text-[#434654]">
        Curating Project Alpha&apos;s production pipeline and milestones.
      </p>
    </div>
  );
}
