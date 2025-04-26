"use client";

import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useCalendar from "@/hooks/use-calendar";
import {
  formatDateForDay,
  formatDateForWeekdayOnDesktop,
  formatDateForWeekdayOnMobile,
} from "@/lib/date-utils";

const CalendarHeader = () => {
  const calendar = useCalendar();
  const currentMonthAndYear = calendar.currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  return (
    <header className="sticky top-0 z-10 flex flex-col items-start justify-start md:p-4 p-2 bg-gradient-header w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-white font-bold text-lg">{currentMonthAndYear}</h1>
        <div className="flex justify-center items-center gap-0 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-none"
            onClick={() => calendar.goToPreviousDay()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-none"
            onClick={() => calendar.goToNextDay()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center items-center w-full gap-1 h-full mt-2">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20 max-md:hidden flex items-center justify-center px-1 h-full rounded-none"
          onClick={() => calendar.goToPreviousWeek()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="grid grid-cols-7 w-full gap-2">
          {calendar.weekDates.map((date, index) =>
            calendar.isMobile ? (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`w-full h-full flex flex-col items-center justify-center gap-0 p-2 rounded-md whitespace-nowrap text-white/100 hover:text-white ${
                  date.getTime() === calendar.selectedDate.getTime()
                    ? "bg-gradient-active text-white shadow-md shadow-black/30 hover:bg-white/20"
                    : "text-white hover:bg-white/20 hover:shadow-md hover:shadow-black/20 transition-all duration-200 bg-white/10"
                }`}
                onClick={() => calendar.goToDate(date)}
              >
                <span className="text-xl font-bold">{formatDateForDay(date)}</span>
                <span className="text-xs">{formatDateForWeekdayOnMobile(date)}</span>
              </Button>
            ) : (
              <Button
                key={index}
                variant="ghost"
                className={`h-full w-full rounded-md hover:text-white flex items-start justify-center text-start flex-col gap-0 ${
                  date.getTime() === calendar.selectedDate.getTime()
                    ? "bg-gradient-active text-white shadow-md shadow-black/30 hover:bg-white/20"
                    : "text-white hover:bg-white/20 hover:shadow-md hover:shadow-black/20 transition-all duration-200 bg-white/10"
                }`}
                onClick={() => calendar.goToDate(date)}
              >
                <span className="text-xl font-bold">
                  {formatDateForDay(date)}
                </span>
                <span className="text-xs">
                  {formatDateForWeekdayOnDesktop(date)}
                </span>
              </Button>
            )
          )}
        </div>
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20 max-md:hidden flex items-center justify-center px-1 rounded-none min-h-full h-full"
          onClick={() => calendar.goToNextWeek()}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default CalendarHeader;
