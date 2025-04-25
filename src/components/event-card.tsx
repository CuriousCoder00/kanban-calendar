"use client";

import { EventCardProps } from "@/types";
import React from "react";
import { motion } from "motion/react";
const EventCard = ({ event, date }: EventCardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-grab hover:shadow-md hover:shadow-black/20`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      layoutId={`event-${event.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-24 w-full relative">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-gradient-active text-white text-xs font-medium px-2 py-1 rounded-full">
          {event.time}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800">{event.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
};

export default EventCard;
