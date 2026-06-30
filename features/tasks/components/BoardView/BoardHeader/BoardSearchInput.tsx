"use client";

import Image from "next/image";
import { cn } from "@/libs/utils";

interface BoardSearchInputProps {
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BoardSearchInput({
  className,
  value,
  onChange,
}: BoardSearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="/icons/search.svg"
        alt="Search"
        width={16}
        height={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
      />
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={onChange}
        className="w-full bg-[#D7E2FF] rounded-md pl-10 pr-4 py-2.5 text-[14px] text-[#041B3C] placeholder:text-[#737685] focus:outline-none focus:ring-1 focus:ring-[#0052CC]"
      />
    </div>
  );
}
