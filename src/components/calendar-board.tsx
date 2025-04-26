"use client";

import useCalendar from "@/hooks/use-calendar";
import React, { useRef } from "react";
import DayCol from "./day-col";
import { formatDate } from "@/lib/date-utils";
import { DndContext } from "@dnd-kit/core";

const CalendarBoard = () => {
  const calendar = useCalendar();

  const boardRef = useRef<HTMLDivElement>(null);
  return (
    <DndContext>
      <div ref={boardRef} className="flex overflow-x-auto h-full">
        {!calendar.isMobile ? (
          calendar.weekDates.map((date) => {
            const dateStr = formatDate(date);
            const eventsForDate = calendar.events[dateStr] || [];
            return <DayCol key={dateStr} date={date} events={eventsForDate} />;
          })
        ) : (
          <div className="flex flex-col gap-2 w-full h-full">
            {
              <DayCol
                key={formatDate(calendar.selectedDate)}
                date={calendar.selectedDate}
                events={
                  calendar.events[formatDate(calendar.selectedDate)] || []
                }
              />
            }
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default CalendarBoard;
