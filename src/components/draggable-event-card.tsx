"use client";

import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { DraggableEventCardProps } from "@/types";
import { cn } from "@/lib/utils";
import useCalendar from "@/hooks/use-calendar";
import EventCard from "./event-card";
import { motion } from "framer-motion";

const DraggableEventCard = ({ event, date }: DraggableEventCardProps) => {
  const calendar = useCalendar();

  const { attributes, listeners, setNodeRef, isDragging } =
    useDraggable({
      id: event.id,
      data: {
        event,
        date,
      },
    });

  useEffect(() => {
    if (isDragging && typeof navigator !== "undefined" && navigator.vibrate && calendar.isMobile) {
      navigator.vibrate(30); // Subtle vibration feedback
    }
  }, [isDragging]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isDragging) {
      e.stopPropagation();
      calendar.setSelectedEvent(event);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "transition-all duration-200",
        isDragging && "opacity-0 pointer-events-none"
      )}
      onClick={handleClick}
    >
      <div
        {...attributes}
        {...listeners}
        className={cn(
          "rounded cursor-grab active:cursor-grabbing",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "transition-colors duration-200"
        )}
      >
        <EventCard date={date} event={event} isDragging={isDragging} />
      </div>
    </motion.div>
  );
};

export default DraggableEventCard;
