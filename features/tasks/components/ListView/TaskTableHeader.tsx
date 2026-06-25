"use client";
export function TaskTableHeader() {
  return (
    <thead className="border-b border-[#E8EDFF]">
      <tr>
        <th className="py-3 px-4 text-left text-[11px] font-bold uppercase text-[#434654]">
          Task ID
        </th>
        <th className="py-3 px-4 text-left text-[11px] font-bold uppercase text-[#434654]">
          Title
        </th>
        <th className="py-3 px-4 text-left text-[11px] font-bold uppercase text-[#434654]">
          Status
        </th>
        <th className="py-3 px-4 text-left text-[11px] font-bold uppercase text-[#434654]">
          Due Date
        </th>
        <th className="py-3 px-4 text-left text-[11px] font-bold uppercase text-[#434654]">
          Assignee
        </th>
        <th className="py-3 px-4 text-right text-[11px] font-bold uppercase text-[#434654]"></th>
      </tr>
    </thead>
  );
}
