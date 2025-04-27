"use client";

import React, { useEffect, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { formatDate, formatDateForDisplay } from "@/lib/date-utils";
import { DayColProps } from "@/types";
import DraggableEventCard from "./draggable-event-card";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import useCalendar from "@/hooks/use-calendar";
import { cn } from "@/lib/utils";

const DayCol = ({ date, events }: DayColProps) => {
  const calendar = useCalendar();
  const [shouldShow, setShouldShow] = useState(true);

  const { setNodeRef, isOver } = useDroppable({
    id: formatDate(date),
    data: { date: formatDate(date) },
  });

  useEffect(() => {
    if (calendar.isMobile) {
      setShouldShow(date.getTime() === calendar.selectedDate.getTime());
    } else {
      setShouldShow(true);
    }
  }, [calendar.isMobile, calendar.selectedDate, date]);

  if (!shouldShow) return null;

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        calendar.isMobile ? "w-full" : "flex-1 lg:min-w-[200px] md:min-w-[150px] max-w-[300px]",
        "transition-all"
      )}
    >
      {/* Date Header */}
      <div className="md:hidden flex items-center justify-start px-4 pt-2 font-bold overflow-hidden w-full gap-2">
        <h1 className="flex items-center justify-start w-full text-lg text-nowrap">
          {formatDateForDisplay(date)}
        </h1>
        <Separator className="flex items-center justify-start w-full h-[1px] bg-gray-500/40" />
      </div>

      <div
        className={cn(
          "p-2 max-md:hidden border-b-2",
          date.getTime() === calendar.selectedDate.getTime()
            ? "border-blue-500 text-blue-700 bg-gradient-active-secondary"
            : "text-muted-foreground border-gray-500/10"
        )}
      >
        <h2 className="font-medium">{formatDateForDisplay(date)}</h2>
      </div>

      {/* Event List */}
      <div
        className={cn(
          "flex-1 p-4 overflow-y-auto no-scrollbar transition-all duration-300",
          isOver && "bg-blue-100/30 border border-dashed border-blue-500/50"
        )}
      >
        <div ref={setNodeRef} className="flex flex-col gap-4 h-full">
          {events.length > 0 ? (
            events.map((event) => (
              <DraggableEventCard
                key={event.id}
                event={event}
                date={formatDate(date)}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-400 py-8 h-full"
            >
              No events for this day
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayCol;
