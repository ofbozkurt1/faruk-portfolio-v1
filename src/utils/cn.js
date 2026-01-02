import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with clsx and tailwind-merge
 * Handles conditional classes and deduplication
 * 
 * @param {...(string|object|array)} inputs - Class names or conditions
 * @returns {string} Merged class string
 * 
 * @example
 * cn("px-4 py-2", isActive && "bg-white", "px-6")
 * // Returns: "py-2 px-6 bg-white" (px-6 overrides px-4)
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
