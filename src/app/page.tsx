"use client";

import CalendarBoard from "@/components/calendar-board";
import CalendarHeader from "@/components/calendar-header";
import EventDetailCard from "@/components/event-details-card";
import { CalendarProvider } from "@/context/calendar-context";

export default function Home() {
  return (
    <CalendarProvider>
      <div className="bg-gradient-subtle flex flex-col min-h-dvh w-full">
        <CalendarHeader />
        <div className="flex-1 overflow-hidden px-10 min-h-full">
          <CalendarBoard />
        </div>
        <EventDetailCard />
      </div>
    </CalendarProvider>
  );
}
