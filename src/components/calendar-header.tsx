"use client";

import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCalendar from "@/hooks/use-calendar";
import {
  formatDateForDay,
  formatDateForMonth,
  formatDateForWeekday,
} from "@/lib/date-utils";

const CalendarHeader = () => {
  const calendar = useCalendar();
  return (
    <header className="sticky top-0 z-10 flex flex-col items-start justify-start p-4 bg-gradient-header w-full">
      <div className="flex items-center max-lg:justify-between w-full">
        <h1 className="text-white font-bold text-lg">Your Schedule</h1>
        <div className="flex justify-center items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 w-full relative mt-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 absolute left-0 z-10 max-lg:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="grid grid-cols-7 gap-2 mt-2 w-full pb-2 relative items-center place-content-center place-items-center">
          {calendar.weekDates.map((date, index) =>
            calendar.isMobile ? (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`w-full h-full flex flex-col items-center justify-center p-2 rounded-lg text-sm whitespace-nowrap text-white/100 hover:text-white ${
                  date.getTime() === calendar.selectedDate.getTime()
                    ? "bg-gradient-active text-white shadow-md shadow-black/30 hover:bg-white/20"
                    : "text-white hover:bg-white/20 hover:shadow-md hover:shadow-black/20 transition-all duration-200 bg-white/10"
                }`}
                onClick={() => calendar.goToDate(date)}
              >
                <span>{formatDateForWeekday(date)}</span>
                <span>{formatDateForDay(date)}</span>
              </Button>
            ) : (
              <Button
                key={index}
                variant="ghost"
                className={`h-full rounded-lg text-sm whitespace-nowrap hover:text-white flex items-center justify-center flex-col ${
                  date.getTime() === calendar.selectedDate.getTime()
                    ? "bg-gradient-active text-white"
                    : "text-white hover:bg-white/20 bg-white/10"
                }`}
                onClick={() => calendar.goToDate(date)}
              >
                <span>{formatDateForWeekday(date)}</span>
                <span>
                  {formatDateForMonth(date) + " " + formatDateForDay(date)}
                </span>
              </Button>
            )
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 absolute right-0 max-lg:hidden"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default CalendarHeader;
