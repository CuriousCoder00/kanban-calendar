"use client";

import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCalendar from "@/hooks/use-calendar";

const CalendarHeader = () => {
  const calendar = useCalendar();
  return (
    <header className="sticky top-0 z-10 flex flex-col items-start justify-start p-4 bg-gradient-header w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-white font-bold text-lg">Your Schedule</h1>
      </div>
      <div className="flex justify-center items-center gap-2 w-full relative mt-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 absolute left-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="grid grid-cols-7 gap-2 mt-2 w-full pb-2">
          {calendar.weekDates.map((date, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-white"
            >
              <span className="text-sm font-semibold">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-lg font-bold">{date.getDate()}</span>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 absolute right-0"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default CalendarHeader;
