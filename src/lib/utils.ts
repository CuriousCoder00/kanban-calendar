import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';
/**
 * Merges class names into a single string, removing duplicates and resolving conflicts.
 * This function is useful for conditionally applying class names in a React component.
 * @param inputs - The class names to merge. Can be a string, an array of strings, or an object with class names as keys and booleans as values.
 * @returns - A single string with all the class names merged together, removing any duplicates and resolving conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}