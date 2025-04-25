"use client";

import useCalendar from "@/hooks/use-calendar";
import React from "react";
import DayCol from "./day-col";
import { formatDate } from "@/lib/date-utils";

const CalendarBoard = () => {
  const calendar = useCalendar();
  return (
    <div className="flex h-full overflow-x-auto">
      {calendar.weekDates.map((date) => {
        const dateStr = formatDate(date);
        return <DayCol key={dateStr} date={date} />;
      })}
    </div>
  );
};

export default CalendarBoard;
