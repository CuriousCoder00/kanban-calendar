"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCalendar from "@/hooks/use-calendar";

const EventDetail = () => {
  const calendar = useCalendar();

  if (!calendar.selectedEvent) return null;

  const handleClose = () => {
    calendar.setSelectedEvent(null);
  };

  return (
    <AnimatePresence>
      {calendar.selectedEvent && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-lg overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            layoutId={`event-${calendar.selectedEvent.id}`}
          >
            <div className="relative h-64 w-full">
              <img
                src={calendar.selectedEvent.imageUrl}
                alt={calendar.selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-gradient-active text-white text-sm font-medium px-3 py-1 rounded-full">
                {calendar.selectedEvent.time}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-4 bg-white/90 hover:bg-white"
                onClick={handleClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <motion.h2
                className="text-2xl font-bold text-gray-800"
                layoutId={`event-title-${calendar.selectedEvent.id}`}
              >
                {calendar.selectedEvent.title}
              </motion.h2>
              <motion.p
                className="text-gray-600 mt-4"
                layoutId={`event-description-${calendar.selectedEvent.id}`}
              >
                {calendar.selectedEvent.description}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventDetail;
