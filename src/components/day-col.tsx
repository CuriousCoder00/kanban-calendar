"use client";
import useCalendar from "@/hooks/use-calendar";
import { formatDate, formatDateForDisplay } from "@/lib/date-utils";
import { DayColProps } from "@/types";
import React from "react";
import EventCard from "./event-card";
import { motion } from "motion/react";
const DayCol = ({ date, events }: DayColProps) => {
  const calendar = useCalendar();
  return (
    <div className={`flex flex-col ${calendar.isMobile ? "w-full" : "flex-1"}`}>
      <div
        className={`p-2 border-b max-md:hidden ${
          date.getTime() === calendar.selectedDate.getTime()
            ? "border-b-blue-500 text-blue-700 bg-gradient-active-secondary"
            : "text-muted-foreground border-b-gray-500/10"
        }`}
      >
        <h2 className="font-medium">{formatDateForDisplay(date)}</h2>
      </div>
      <div className={`flex-1 p-2 overflow-y-auto no-scrollbar`}>
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
