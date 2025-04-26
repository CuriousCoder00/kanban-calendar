export interface Event {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    time: string;
}

export interface EventsByDate {
    [date: string]: Event[];
}

export interface DayColProps {
    date: Date;
    events: Event[];
}

export interface CalendarContextType {
    currentDate: Date;
    selectedDate: Date;
    weekDates: Date[];
    isMobile: boolean;
    selectedEvent: Event | null;
    events: EventsByDate;
    setEvents: (events: EventsByDate) => void;
    setSelectedEvent: (event: Event | null) => void;
    goToNextDay: () => void;
    goToPreviousDay: () => void;
    goToNextWeek: () => void;
    goToPreviousWeek: () => void;
    goToDate: (date: Date) => void;
}

export interface EventCardProps {
    event: Event;
    date: string;
    isDragging?: boolean;
}

export interface DraggableEventCardProps {
    event: Event;
    date: string;
}