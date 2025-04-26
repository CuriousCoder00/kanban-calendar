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
} from "@dnd-kit/core";
import useCalendar from "@/hooks/use-calendar";
import DayCol from "./day-col";
import { formatDate } from "@/lib/date-utils";
import { Event } from "@/types";
import EventCard from "./event-card";

const HOLD_DURATION = 1500; // 1.5 seconds
const EDGE_THRESHOLD = 40; // px

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

  const edgeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // Reduced from 1500ms to 250ms for better responsiveness
        tolerance: 1,
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

    if (pointerX <= EDGE_THRESHOLD) {
      if (!edgeTimerRef.current) {
        edgeTimerRef.current = setTimeout(() => {
          calendar.goToPreviousDay();
          clearEdgeTimer();
          if (typeof navigator !== "undefined" && navigator.vibrate)
            navigator.vibrate(30); // Haptic feedback
        }, HOLD_DURATION);
      }
    } else if (pointerX >= window.innerWidth - EDGE_THRESHOLD) {
      if (!edgeTimerRef.current) {
        edgeTimerRef.current = setTimeout(() => {
          calendar.goToNextDay();
          clearEdgeTimer();
          if (typeof navigator !== "undefined" && navigator.vibrate)
            navigator.vibrate(30); // Haptic feedback
        }, HOLD_DURATION);
      }
    } else {
      clearEdgeTimer();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    clearEdgeTimer();
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
    >
      <div ref={boardRef} className="flex overflow-x-auto h-full">
        {calendar.weekDates.map((date) => {
          const dateStr = formatDate(date);
          const eventsForDate = sortEventsByTime(
            calendar.events[dateStr] || []
          );
          return <DayCol key={dateStr} date={date} events={eventsForDate} />;
        })}
      </div>

      <DragOverlay>
        {activeId && activeEvent && activeDate ? (
          <EventCard event={activeEvent} date={activeDate} isDragging={true} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default CalendarBoard;
