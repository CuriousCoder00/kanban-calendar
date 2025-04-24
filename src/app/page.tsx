"use client";

import CalendarHeader from "@/components/calendar-header";
import { CalendarProvider } from "@/context/calendar-context";

export default function Home() {
  return (
    <CalendarProvider>
      <div className="bg-gradient-subtle flex flex-col min-h-dvh w-full">
        <CalendarHeader />
      </div>
    </CalendarProvider>
  );
}
