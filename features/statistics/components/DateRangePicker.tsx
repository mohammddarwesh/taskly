"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, differenceInDays, isBefore, parseISO } from "date-fns";

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  maxDays?: number;
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  maxDays = 7,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ FIX: Change state type to DateRange | undefined to match react-day-picker's signature
  const [localRange, setLocalRange] = useState<DateRange | undefined>({
    from: parseISO(startDate),
    to: parseISO(endDate),
  });

  const [error, setError] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setError(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    if (!localRange?.from || !localRange?.to) {
      setError("Please select a start and end date");
      return;
    }

    const diff = differenceInDays(localRange.to, localRange.from);
    if (diff > maxDays - 1) {
      setError(`Date range cannot exceed ${maxDays} days`);
      return;
    }

    if (isBefore(localRange.to, localRange.from)) {
      setError("End date must be after start date");
      return;
    }

    setError(null);
    onChange(
      format(localRange.from, "yyyy-MM-dd"),
      format(localRange.to, "yyyy-MM-dd"),
    );
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalRange({ from: parseISO(startDate), to: parseISO(endDate) });
    setError(null);
    setIsOpen(false);
  };

  return (
    <div ref={pickerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600"
      >
        <span>{format(parseISO(startDate), "MMM d")}</span>
        <span> - </span>
        <span>{format(parseISO(endDate), "MMM d, yyyy")}</span>
      </button>

      {isOpen && (
        <div className="absolute top-9 left-0 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-[340px]">
          <DayPicker
            mode="range"
            selected={localRange}
            onSelect={(range) => {
              setLocalRange(range);
              setError(null);
            }}
            numberOfMonths={1}
            showOutsideDays
            className="w-full"
          />
          {error && <p className="text-red-500 text-xs mt-1 mb-2">{error}</p>}
          <div className="flex justify-end gap-2 border-t pt-3 mt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 px-3 py-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="text-sm font-medium bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700"
            >
              Apply Range
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
