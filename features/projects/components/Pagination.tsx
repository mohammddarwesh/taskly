import Image from "next/image";

export function Pagination() {
  return (
    <div className="flex items-center justify-between pt-12 pb-8 px-8">
      {/* Page indicator */}
      <span className="text-xs font-medium leading-4 text-[#434654]">
        Page 1 of 10
      </span>

      {/* Page buttons */}
      <div className="flex gap-2">
        {/* Previous button */}
        <button
          aria-label="Previous page"
          className="flex items-center justify-center w-8 h-8 
                     border border-[rgba(195,198,214,0.3)] rounded-sm
                     text-[#434654] hover:bg-gray-50 transition-colors"
        >
          <Image
            src="/icons/arrowLeft.svg"
            alt=""
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </button>

        {/* Active page */}
        <button
          aria-label="Page 1"
          aria-current="page"
          className="flex items-center justify-center w-8 h-8 
                     bg-[#003D9B] border border-[rgba(195,198,214,0.3)] rounded-sm
                     text-white text-xs font-bold transition-colors"
        >
          1
        </button>

        {/* Inactive page */}
        <button
          aria-label="Page 2"
          className="flex items-center justify-center w-8 h-8 
                     border border-[rgba(195,198,214,0.3)] rounded-sm
                     text-[#434654] text-xs font-bold hover:bg-gray-50 transition-colors"
        >
          2
        </button>

        {/* Next button */}
        <button
          aria-label="Next page"
          className="flex items-center justify-center w-8 h-8 
                     border border-[rgba(195,198,214,0.3)] rounded-sm
                     text-[#434654] hover:bg-gray-50 transition-colors"
        >
          <Image
            src="/icons/arrowRight.svg"
            alt=""
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </button>
      </div>
    </div>
  );
}
