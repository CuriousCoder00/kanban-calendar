/**
 * Formats a date as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Gets the start of the week for a given date
 */
export function getStartOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day + (day === 0 ? -6 : 1); // Adjust when Sunday
    result.setDate(diff);
    return result;
}

/**
 * Gets the end of the week for a given date
 */
export function getEndOfWeek(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day + (day === 0 ? 0 : 7); // Adjust when Sunday
    result.setDate(diff);
    return result;
}

/**
 * Gets all dates in a week
 */
export function getDatesInWeek(date: Date): Date[] {
    const startOfWeek = getStartOfWeek(date);
    const dates: Date[] = [];

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        dates.push(currentDate);
    }

    return dates;
}

/**
 * Formats a date for display (e.g., "Mon, Mar 11")
 */
export function formatDateForDisplay(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format a date and returns only Weekday
 */
export function formatDateForWeekday(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format a date and returns only Day
 */
export function formatDateForDay(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format a date and returns only Month
 */
export function formatDateForMonth(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Checks if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * Adds days to a date
 */
export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Subtracts days from a date
 */
export function subtractDays(date: Date, days: number): Date {
    return addDays(date, -days);
}