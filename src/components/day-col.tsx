"use client";
import useCalendar from "@/hooks/use-calendar";
import { formatDate, formatDateForDisplay } from "@/lib/date-utils";
import { DayColProps } from "@/types";
import React, { useRef } from "react";
import EventCard from "./event-card";
import { motion } from "motion/react";
import { Separator } from "./ui/separator";
const DayCol = ({ date, events }: DayColProps) => {
  const calendar = useCalendar();
  const columnRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={columnRef}
      className={`flex flex-col h-full ${
        calendar.isMobile ? "w-full" : "flex-1"
      }`}
    >
      <div className="md:hidden flex items-center justify-start px-4 pt-2 font-bold overflow-hidden whitespace-nowrap">
        <h1 className="text-lg text-nowrap">{formatDateForDisplay(date)}</h1>
        <Separator className="flex h-[1px] bg-gray-500/40 mx-2" />
      </div>
      <div
        className={`p-2 max-md:hidden border-b-2 ${
          date.getTime() === calendar.selectedDate.getTime()
            ? "border-b-blue-500 text-blue-700 bg-gradient-active-secondary"
            : "text-muted-foreground border-b-gray-500/10"
        }`}
      >
        <h2 className="font-medium">{formatDateForDisplay(date)}</h2>
      </div>
      <div className={`flex-1 md:p-2 p-4 overflow-y-auto no-scrollbar`}>
        <div className="flex flex-col gap-4">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} date={formatDate(date)} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-400 py-8"
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
