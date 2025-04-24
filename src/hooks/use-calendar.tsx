"use client";

import { CalendarContext } from "@/context/calendar-context";
import React from "react";

const useCalendar = () => {
  const context = React.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};

export default useCalendar;
