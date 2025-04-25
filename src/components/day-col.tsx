"use client";
import useCalendar from "@/hooks/use-calendar";
import { formatDateForDisplay } from "@/lib/date-utils";
import { DayColProps } from "@/types";
import React from "react";

const DayCol = ({ date }: DayColProps) => {
  const calendar = useCalendar();
  return (
    <div
      className={`flex flex-col h-full ${
        calendar.isMobile ? "w-full" : "flex-1"
      }`}
    >
      <div
        className={`p-2 border-b max-md:hidden ${
          date.getTime() === calendar.selectedDate.getTime()
            ? "border-b-blue-500 text-blue-700 bg-gradient-active-secondary"
            : "text-muted-foreground border-b-gray-500/10"
        }`}
      >
        <h2 className="font-medium">{formatDateForDisplay(date)}</h2>
      </div>
      <div className="flex items-center justify-start md:hidden w-full">
        <h2 className="font-medium">{formatDateForDisplay(date)}</h2>
      </div>
    </div>
  );
};

export default DayCol;
