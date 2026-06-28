import { useState, useEffect, useRef, useCallback } from "react";
import Head from "@/components/ui/Head";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/Input";

interface EpicHeaderProps {
  projectId: string;
  searchValue: string; // from URL
  onSearchChange: (value: string) => void; // updates URL (debounced)
}

export function EpicHeader({
  projectId,
  searchValue,
  onSearchChange,
}: EpicHeaderProps) {
  const [inputValue, setInputValue] = useState(searchValue);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const isInternalUpdate = useRef(false);

  // Sync input when URL changes (back/forward)
  useEffect(() => {
    if (!isInternalUpdate.current) {
      setInputValue(searchValue);
    }
    isInternalUpdate.current = false;
  }, [searchValue]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      isInternalUpdate.current = true;

      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onSearchChange(val);
      }, 400);
    },
    [onSearchChange],
  );

  return (
    <div className="md:flex w-full justify-between items-center gap-8 mb-8 md:pt-8">
      <Head head="Project Epics" className="pt-4 pb-0 hidden md:block" />

      <div className="flex gap-8">
        <div className="relative flex items-center w-full min-w-[300px] h-12 bg-[#D7E2FF] rounded-sm px-3 focus-within:ring-1 focus-within:ring-[#003D9B] focus-within:ring-opacity-50">
          <Image
            src="/icons/search.svg"
            alt="Search"
            width={10.5}
            height={10.5}
            className="opacity-60 shrink-0"
          />
          <Input
            id="search"
            label=""
            placeholder="Search epics..."
            value={inputValue}
            onChange={handleInputChange}
            className="bg-transparent border-none! focus:outline-none! focus:ring-0! focus:border-transparent! pl-3 h-full text-sm placeholder:text-[#737685]"
          />
        </div>
        <Link
          href={`/project/${projectId}/epics/new`}
          className="hidden md:block w-full"
        >
          <Button className="py-3">
            <Image
              src="/icons/plus.svg"
              alt="add Member"
              width={18.33}
              height={13.33}
              className="mr-2"
            />
            New Epic
          </Button>
        </Link>
      </div>
    </div>
  );
}
