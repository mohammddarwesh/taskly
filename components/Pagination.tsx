"use client";

import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <div className="flex items-center justify-between pt-12 pb-8 px-8">
      <span className="text-xs font-medium leading-4 text-[#434654]">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:cursor-pointer flex items-center justify-center w-8 h-8 
                     border border-[rgba(195,198,214,0.3)] rounded-sm
                     text-[#434654] hover:bg-gray-50 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <Image src="/icons/arrowLeft.svg" alt="" width={16} height={16} />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="flex items-center justify-center w-8 h-8 text-xs text-[#434654] "
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`hover:cursor-pointer flex items-center justify-center w-8 h-8 
                         border border-[rgba(195,198,214,0.3)] rounded-sm
                         text-xs font-bold transition-colors
                         ${
                           page === currentPage
                             ? "bg-[#003D9B] text-white"
                             : "text-[#434654] hover:bg-gray-50"
                         }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex hover:cursor-pointer items-center justify-center w-8 h-8 
                     border border-[rgba(195,198,214,0.3)] rounded-sm
                     text-[#434654] hover:bg-gray-50 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <Image src="/icons/arrowRight.svg" alt="" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}
