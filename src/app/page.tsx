"use client";

import AddEvent from "@/components/add-event";
import CalendarBoard from "@/components/calendar-board";
import CalendarHeader from "@/components/calendar-header";
import EventDetailCard from "@/components/event-details-card";
import { CalendarProvider } from "@/context/calendar-context";

export default function Home() {
  return (
    <CalendarProvider>
      <div className="flex flex-col h-dvh w-dvw bg-gradient-subtle">
        <CalendarHeader />
        <div className="flex-1 overflow-hidden">
          <CalendarBoard />
        </div>
        <EventDetailCard />
        <AddEvent/>
      </div>
    </CalendarProvider>
  );
}
