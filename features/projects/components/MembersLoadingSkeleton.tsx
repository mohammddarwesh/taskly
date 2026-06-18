export function MembersLoadingSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-[0px_1px_2px_rgba(0,0,0,0.05)] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-[rgba(224,232,255,0.3)] h-[54px]">
            <th className="px-8"><div className="h-3 bg-gray-200 rounded w-16 animate-pulse" /></th>
            <th className="px-8"><div className="h-3 bg-gray-200 rounded w-12 animate-pulse" /></th>
            <th className="px-8 text-right"><div className="h-3 bg-gray-200 rounded w-16 animate-pulse ml-auto" /></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className={`h-[88.5px] animate-pulse ${i !== 0 ? 'border-t border-[#E8EDFF]' : ''}`}>
              <td className="px-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200" />
                  <div className="flex flex-col gap-1">
                    <div className="h-4 bg-gray-200 rounded w-32" />
                    <div className="h-3 bg-gray-200 rounded w-48" />
                  </div>
                </div>
              </td>
              <td className="px-8"><div className="h-5 bg-gray-200 rounded-full w-16" /></td>
              <td className="px-8 text-right"><div className="w-4 h-4 bg-gray-200 rounded ml-auto" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}