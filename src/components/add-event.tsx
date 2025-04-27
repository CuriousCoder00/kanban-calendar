"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { LucidePlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCalendar from "@/hooks/use-calendar";
import { EventsByDate } from "@/types";
import { imageUrl } from "@/constants/image-url";

// Zod Schema
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  time: z.string().optional(),
  description: z.string().optional(),
  date: z
    .date()
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Cannot add event for a past date",
    }),
});

// Type for form
type EventFormValues = z.infer<typeof eventSchema>;

const AddEvent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const calendar = useCalendar();
  const today = new Date();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      time: "",
      description: "",
      date: today,
    },
  });

  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
    form.reset({ date: today });
  };

  const formatTimeToAmPm = (timeStr: string) => {
    if (!timeStr) return "";
    const [hoursStr, minutesStr] = timeStr.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr;
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 0 -> 12 for AM
    return `${hours}:${minutes} ${period}`;
  };

  const onSubmit = (data: EventFormValues) => {
    const dateKey = data.date.toISOString().split("T")[0]; // Example: "2025-04-29"

    const newEvent = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description || "",
      imageUrl: imageUrl(), // Or you can make dynamic later
      time: formatTimeToAmPm(data.time || ""),
    };

    const updatedEvents = { ...calendar.events };
    const newEventItem = updatedEvents[dateKey];
    if (!newEventItem) {
      updatedEvents[dateKey] = [newEvent];
    } else {
      updatedEvents[dateKey].push(newEvent);
    }

    calendar.setEvents(updatedEvents as EventsByDate);

    handleToggleForm(); // Close the form
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <AnimatePresence>
        {!isFormOpen ? (
          <motion.div
            key="button"
            initial={{ x: 100, width: 56, height: 56 }}
            animate={{ x: 0, width: 56, height: 56 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-2 right-2 z-[100]"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button
              size="icon"
              onClick={handleToggleForm}
              className="bg-gradient-active text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out"
            >
              <LucidePlus />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ width: 56, height: 56 }}
            animate={{ width: 320, height: "auto", padding: 16 }}
            exit={{ width: 56, height: 56, scale: 0.8, opacity: 0, padding: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gradient-active rounded-lg shadow-2xl flex flex-col gap-4 p-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-white font-semibold text-lg">New Event</h2>
              <button type="button" onClick={handleToggleForm}>
                <X className="text-white w-5 h-5" />
              </button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-4"
              >
                <div className="flex flex-col space-y-4">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label className="text-white text-sm">Title</Label>
                        <FormControl>
                          <Input
                            className="w-full text-white"
                            placeholder="Enter event title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Label className="text-white text-sm">
                          Description
                        </Label>
                        <FormControl>
                          <Textarea
                            className="w-full text-white"
                            placeholder="Optional description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-300 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Time + Date */}
                  <div className="flex items-center justify-start gap-2">
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Label className="text-white text-sm">Time</Label>
                          <FormControl>
                            <Input
                              type="time"
                              className="w-full text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-300 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Label className="text-white text-sm">Date</Label>
                          <FormControl>
                            <Input
                              type="date"
                              min={new Date().toISOString().split("T")[0]}
                              value={
                                field.value
                                  ? new Date(field.value)
                                      .toISOString()
                                      .split("T")[0]
                                  : ""
                              }
                              onChange={(e) =>
                                field.onChange(new Date(e.target.value))
                              }
                              className="w-full text-white"
                            />
                          </FormControl>
                          <FormMessage className="text-red-300 text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="bg-white text-black w-full hover:bg-gray-200"
                  >
                    Save Event
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddEvent;
