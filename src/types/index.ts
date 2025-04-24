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

export interface CalendarContextType {
    currentDate: Date;
    selectedDate: Date;
    weekDates: Date[];
    isMobile: boolean;
    goToNextDay: () => void;
    goToPreviousDay: () => void;
    goToNextWeek: () => void;
    goToPreviousWeek: () => void;
    goToDate: (date: Date) => void;
}