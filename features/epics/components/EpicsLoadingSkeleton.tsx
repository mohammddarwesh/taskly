export function EpicsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col p-4 bg-white rounded-lg border-l-4 border-gray-200 shadow-sm animate-pulse">
          <div className="flex justify-between">
            <div className="h-5 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-4" />
          </div>
          <div className="h-7 bg-gray-200 rounded w-3/4 mt-2" />
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-200" />
              <div>
                <div className="h-3 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-20 mt-1" />
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}