"use client";

import React from "react";
import { motion } from "framer-motion";
import { EventCardProps } from "@/types";
import Image from "next/image";

const EventCard = ({ event, isDragging = false }: EventCardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform ${
        isDragging ? "opacity-70 cursor-grabbing scale-50 shadow-sm shadow-blue-500" : ""
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      layoutId={`event-${event.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full h-24 md:h-24 sm:h-44">
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-gradient-active text-white text-xs font-semibold px-2 py-1 rounded-full">
          {event.time}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 line-clamp-1">{event.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
};

export default EventCard;
