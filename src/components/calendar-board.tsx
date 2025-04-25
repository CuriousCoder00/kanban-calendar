"use client";

import useCalendar from "@/hooks/use-calendar";
import React from "react";
import DayCol from "./day-col";
import { formatDate } from "@/lib/date-utils";

const CalendarBoard = () => {
  const calendar = useCalendar();
  return (
    <div className="flex overflow-x-auto">
      {calendar.weekDates.map((date) => {
        const dateStr = formatDate(date);
        const eventsForDate = calendar.events[dateStr] || [];
        return <DayCol key={dateStr} date={date} events={eventsForDate} />;
      })}
    </div>
  );
};

export default CalendarBoard;
