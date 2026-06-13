export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-start p-6 gap-4 bg-white 
                     border border-[hsla(231,19%,80%,0)] 
                     shadow-[0px_1px_2px_#000000c] 
                     rounded-lg animate-pulse"
        >
          <div className="h-32 w-full bg-[#E8EDFF] rounded" />

          <div className="w-3/4 h-6 bg-[#E8EDFF] rounded-sm" />

          <div className="w-1/2 h-4 bg-[#E8EDFF] rounded-sm" />
        </div>
      ))}
    </div>
  );
}
