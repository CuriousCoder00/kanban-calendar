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
  pointerWithin,
} from "@dnd-kit/core";
import useCalendar from "@/hooks/use-calendar";
import DayCol from "./day-col";
import { formatDate } from "@/lib/date-utils";
import { Event } from "@/types";
import EventCard from "./event-card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const HOLD_DURATION = 1500; // 1.5 seconds
const EDGE_THRESHOLD = 40; // You can adjust this!

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
  const [hasSwitchedEdge, setHasSwitchedEdge] = useState(false);
  const edgeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isTouchDevice = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(pointer: coarse)").matches;
    }
    return false;
  };
  const sensors = useSensors(
    useSensor(isTouchDevice() ? TouchSensor : PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
      delayMeasureConstraint: {
        timeout: 150,
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
    if (!boardRef.current || !event.active.rect.current?.translated) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const activeRect = event.active.rect.current.translated;

    const distanceFromLeft = activeRect.left - boardRect.left;
    const distanceFromRight = boardRect.right - activeRect.right;
    const deltaX = event.delta.x;

    if (calendar.isMobile) {
      // --- Mobile logic: Switch only once ---
      if (!hasSwitchedEdge) {
        if (deltaX < 0 && distanceFromLeft <= EDGE_THRESHOLD) {
          setEdgeState("left");
          if (!edgeTimerRef.current) {
            edgeTimerRef.current = setTimeout(() => {
              calendar.goToPreviousDay();
              clearEdgeTimer();
              setHasSwitchedEdge(true); // mark as switched
            }, HOLD_DURATION);
          }
        } else if (deltaX > 0 && distanceFromRight <= EDGE_THRESHOLD) {
          setEdgeState("right");
          if (!edgeTimerRef.current) {
            edgeTimerRef.current = setTimeout(() => {
              calendar.goToNextDay();
              clearEdgeTimer();
              setHasSwitchedEdge(true); // mark as switched
            }, HOLD_DURATION);
          }
        } else {
          setEdgeState(null);
          clearEdgeTimer();
        }
      }
    } else {
      // --- Desktop logic: Allow multiple switching ---
      if (distanceFromLeft <= EDGE_THRESHOLD) {
        setEdgeState("left");
        if (!edgeTimerRef.current) {
          edgeTimerRef.current = setTimeout(() => {
            calendar.goToPreviousWeek();
            clearEdgeTimer();
          }, HOLD_DURATION);
        }
      } else if (distanceFromRight <= EDGE_THRESHOLD) {
        setEdgeState("right");
        if (!edgeTimerRef.current) {
          edgeTimerRef.current = setTimeout(() => {
            calendar.goToNextWeek();
            clearEdgeTimer();
          }, HOLD_DURATION);
        }
      } else {
        setEdgeState(null);
        clearEdgeTimer();
      }
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
    setHasSwitchedEdge(false); // Reset switching for next drag
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={calendar.isMobile ? pointerWithin : closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      id="calendar-dnd-context"
    >
      <div
        ref={boardRef}
        className={cn(
          "flex md:overflow-x-auto overflow-hidden max-md:min-w-dvw h-full relative",
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
          return calendar.isMobile ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={calendar.selectedDate.toISOString()} // key to re-trigger animation on date change
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className="absolute inset-0 w-full overflow-hidden"
              >
                <DayCol
                  date={calendar.selectedDate}
                  events={
                    calendar.events[formatDate(calendar.selectedDate)] || []
                  }
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <DayCol key={dateStr} date={date} events={eventsForDate} />
          );
        })}
      </div>

      <DragOverlay>
        {activeId && activeEvent && activeDate ? (
          <motion.div
            initial={{ scale: 1, rotate: 0 }}
            animate={{
              scale: 0.8,
              rotate: -1,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <EventCard
              event={activeEvent}
              date={activeDate}
              isDragging={true}
            />
          </motion.div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default CalendarBoard;
