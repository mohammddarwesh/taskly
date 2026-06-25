"use client";

export function TaskTableFooter({ total, shown }: { total: number; shown: number }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#E8EDFF]">
      <p className="text-[13px] text-[#737685] font-medium">Showing {shown} of {total} tasks</p>
      <div className="flex items-center gap-2">
        <button className="p-1.5 hover:bg-[#F3F4F6] rounded text-[#737685] opacity-50 cursor-not-allowed">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <span className="text-[14px] font-medium text-[#434654]">Page 1 of 5</span>
        <button className="p-1.5 hover:bg-[#F3F4F6] rounded text-[#737685]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}