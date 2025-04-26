"use client";

import React, { useRef, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  DragStartEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  TouchSensor,
} from "@dnd-kit/core";
import useCalendar from "@/hooks/use-calendar";
import DayCol from "./day-col";
import { formatDate } from "@/lib/date-utils";
import { Event } from "@/types";
import EventCard from "./event-card";
import { cn } from "@/lib/utils";

const HOLD_DURATION = 1500; // 1.5 seconds
const EDGE_THRESHOLD = 40; // px
const MOBILE_EDGE_THRESHOLD = 1; // px

// Helper function to sort events by time
const sortEventsByTime = (events: Event[]): Event[] => {
  return [...events].sort((a, b) => {
    const timeA = new Date(`1970/01/01 ${a.time}`);
    const timeB = new Date(`1970/01/01 ${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });
};

const CalendarBoard = () => {
  const calendar = useCalendar();
  const boardRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [edgeState, setEdgeState] = useState<"left" | "right" | null>(null);

  const FINAL_THRESHOLD = calendar.isMobile
    ? MOBILE_EDGE_THRESHOLD
    : EDGE_THRESHOLD;

  const edgeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
        delayMeasurementConstraint: {
          delay: 150,
          tolerance: 5,
        },
      },
    })
  );

  const clearEdgeTimer = () => {
    if (edgeTimerRef.current) {
      clearTimeout(edgeTimerRef.current);
      edgeTimerRef.current = null;
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    if (typeof document !== "undefined") {
      document.body.classList.add("dragging");
    }

    // Find event by ID
    for (const date in calendar.events) {
      const found = calendar.events[date].find(
        (e: Event) => e.id === active.id
      );
      if (found) {
        setActiveEvent(found);
        setActiveDate(date);
        break;
      }
    }
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const pointerX =
      event.delta.x + (event.active.rect.current?.translated?.left ?? 0);

    if (pointerX <= FINAL_THRESHOLD) {
      setEdgeState("left");
      if (!edgeTimerRef.current) {
        edgeTimerRef.current = setTimeout(() => {
          calendar.isMobile
            ? calendar.goToPreviousDay()
            : calendar.goToPreviousWeek();
          clearEdgeTimer();
          if (
            typeof navigator !== "undefined" &&
            navigator.vibrate &&
            calendar.isMobile
          )
            navigator.vibrate(30); // Haptic feedback
        }, HOLD_DURATION);
      }
    } else if (pointerX >= window.innerWidth - FINAL_THRESHOLD) {
      setEdgeState("right");
      if (!edgeTimerRef.current) {
        edgeTimerRef.current = setTimeout(() => {
          calendar.isMobile ? calendar.goToNextDay() : calendar.goToNextWeek();
          clearEdgeTimer();
          if (
            typeof navigator !== "undefined" &&
            navigator.vibrate &&
            calendar.isMobile
          )
            navigator.vibrate(30); // Haptic feedback
        }, HOLD_DURATION);
      }
    } else {
      setEdgeState(null);
      clearEdgeTimer();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    clearEdgeTimer();
    setEdgeState(null);

    if (typeof document !== "undefined") {
      document.body.classList.remove("dragging");
    }

    const { active, over } = event;
    if (!over || active.id === over.id) {
      resetActive();
      return;
    }

    const fromDate = activeDate;
    const toDate = over.id as string;

    if (fromDate && toDate && fromDate !== toDate) {
      const updated = { ...calendar.events };
      const eventItem = updated[fromDate].find(
        (e: Event) => e.id === active.id
      );
      if (!eventItem) return;

      // Remove from source date
      updated[fromDate] = updated[fromDate].filter(
        (e: Event) => e.id !== active.id
      );

      // Add to target date and sort by time
      updated[toDate] = sortEventsByTime([
        ...(updated[toDate] || []),
        eventItem,
      ]);

      calendar.setEvents(updated);
    }

    resetActive();
  };

  const resetActive = () => {
    setActiveId(null);
    setActiveEvent(null);
    setActiveDate(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      id="calendar-dnd-context"
    >
      <div
        ref={boardRef}
        className={cn(
          "flex overflow-x-auto h-full relative",
          edgeState === "left" &&
            "before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-blue-500/70 before:shadow-[0_0_10px_rgba(59,130,246,0.5)] before:transition-all before:duration-300",
          edgeState === "right" &&
            "after:content-[''] after:absolute after:right-0 after:top-0 after:w-1 after:h-full after:bg-blue-500/70 after:shadow-[0_0_10px_rgba(59,130,246,0.5)] after:transition-all after:duration-300"
        )}
      >
        {calendar.weekDates.map((date) => {
          const dateStr = formatDate(date);
          const eventsForDate = sortEventsByTime(
            calendar.events[dateStr] || []
          );
          return <DayCol key={dateStr} date={date} events={eventsForDate} />;
        })}
      </div>

      <DragOverlay style={{ zIndex: 1000, touchAction: "none" }}>
        {activeId && activeEvent && activeDate ? (
          <EventCard event={activeEvent} date={activeDate} isDragging={true} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default CalendarBoard;
