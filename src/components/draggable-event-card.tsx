"use client";

import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { DraggableEventCardProps } from "@/types";
import { cn } from "@/lib/utils";
import useCalendar from "@/hooks/use-calendar";
import EventCard from "./event-card";
import { motion } from "framer-motion";

const DraggableEventCard = ({ event, date }: DraggableEventCardProps) => {
  const calendar = useCalendar();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
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

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={cn(
        "transition-all duration-200",
        isDragging && "opacity-0 shadow-lg scale-50 rotate-3"
      )}
      onClick={handleClick}
      animate={isDragging ? {
        x: [0, -2, 2, -1, 1, 0],
        transition: {
          duration: 0.3,
          ease: "easeInOut"
        }
      } : {}}
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
