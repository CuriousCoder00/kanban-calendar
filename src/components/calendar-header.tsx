"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import useCalendar from "@/hooks/use-calendar";
import {
  formatDateForDay,
  formatDateForDisplay,
  formatDateForWeekdayOnDesktop,
  formatDateForWeekdayOnMobile,
} from "@/lib/date-utils";
import { cn } from "@/lib/utils";

const CalendarHeader = () => {
  const calendar = useCalendar();
  const currentMonthAndYear = calendar.currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const [goToButtonValue, setGoToButtonValue] = React.useState<string>("Today");

  useEffect(() => {
    const currentDate = formatDateForDisplay(calendar.currentDate);
    const today = formatDateForDisplay(new Date());
    const yesterday = formatDateForDisplay(new Date(Date.now() - 86400000)); // 24 hours in milliseconds
    const tomorrow = formatDateForDisplay(new Date(Date.now() + 86400000)); // 24 hours in milliseconds
    if (currentDate === today) {
      setGoToButtonValue("Today");
    } else if (currentDate === yesterday) {
      setGoToButtonValue("Yesterday");
    } else if (currentDate === tomorrow) {
      setGoToButtonValue("Tomorrow");
    } else {
      setGoToButtonValue(currentDate);
    }
  }, [calendar.currentDate]);

  return (
    <header className="sticky top-0 z-10 flex flex-col items-start justify-start md:p-4 p-2 bg-gradient-header w-full max-w-[100dvw] overflow-hidden">
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
            className="text-white bg-white/10 hover:text-white hover:bg-white/20 rounded-none"
          >
            {goToButtonValue}
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
          {calendar.weekDates.map((date, index) => (
            <div key={index} className="relative w-full h-full">
              {date.getTime() === calendar.selectedDate.getTime() && (
                <motion.div
                  layoutId="activeDate"
                  className="absolute inset-0 rounded-md bg-gradient-active shadow-md shadow-black/30 z-0"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
              <Button
                variant="ghost"
                size={calendar.isMobile ? "icon" : undefined}
                className={cn(
                  "relative w-full h-full flex flex-col items-center justify-center gap-0 p-2 rounded-md whitespace-nowrap text-white hover:text-white hover:bg-transparent bg-transparent z-10",
                  date.getTime() === calendar.selectedDate.getTime()
                    ? "text-white"
                    : "hover:bg-white/20 hover:shadow-md hover:shadow-black/20 transition-all duration-200 bg-white/10"
                )}
                onClick={() => calendar.goToDate(date)}
              >
                <span className="text-xl font-bold">
                  {formatDateForDay(date)}
                </span>
                <span className="text-xs">
                  {calendar.isMobile
                    ? formatDateForWeekdayOnMobile(date)
                    : formatDateForWeekdayOnDesktop(date)}
                </span>
              </Button>
            </div>
          ))}
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
