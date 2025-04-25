"use client";

import React, { createContext, useState, useEffect } from "react";
import * as DateUtils from "@/lib/date-utils";
import { CalendarContextType, Event, EventsByDate } from "@/types/index";
import event_data from "@/constants/mock-data"
export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [weekDates, setWeekDates] = useState<Date[]>(
    DateUtils.getDatesInWeek(new Date())
  );
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<EventsByDate>(event_data);

  // Handle window resize to check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  // Get the week dates based on the current date
  useEffect(() => {
    setWeekDates(DateUtils.getDatesInWeek(currentDate));
  }, [currentDate]);

  const goToNextDay = () => {
    const newDate = DateUtils.addDays(selectedDate, 1);
    setSelectedDate(newDate);
    if (isMobile) {
      setCurrentDate(newDate);
    }
  };

  const goToPreviousDay = () => {
    const newDate = DateUtils.subtractDays(selectedDate, 1);
    setSelectedDate(newDate);
    if (isMobile) {
      setCurrentDate(newDate);
    }
  };
  const goToNextWeek = () => {
    const newDate = DateUtils.addDays(currentDate, 7);
    setCurrentDate(newDate);
    setSelectedDate(newDate);
  };

  const goToPreviousWeek = () => {
    const newDate = DateUtils.subtractDays(currentDate, 7);
    setCurrentDate(newDate);
    setSelectedDate(newDate);
  };

  const goToDate = (date: Date) => {
    setSelectedDate(date);
    if (isMobile) {
      setCurrentDate(date);
    }
  };

  const value = {
    currentDate,
    selectedDate,
    weekDates,
    events,
    isMobile,
    selectedEvent,
    setSelectedEvent,
    goToNextDay,
    goToPreviousDay,
    goToNextWeek,
    goToPreviousWeek,
    goToDate,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
