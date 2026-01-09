/**
 * Service Store - Zustand
 * Global state for active service hover
 * activeServiceIndex = INSTANT (text color, movement)
 * delayedActiveServiceIndex = 1 SEC DELAY (01 number, icons)
 */

import { create } from 'zustand'

let delayTimeout = null

export const useServiceStore = create((set) => ({
    activeServiceIndex: null,        // Instant: text color, movement
    delayedActiveServiceIndex: null, // 1 sec delay: 01 number, icons
    pendingServiceIndex: null,

    // Set active service - instant for color, delayed for details
    setActiveService: (index) => {
        // Clear any existing timeout
        if (delayTimeout) {
            clearTimeout(delayTimeout)
        }

        // Set active immediately (for text color/movement)
        set({ pendingServiceIndex: index, activeServiceIndex: index })

        // Set delayed after 1 second (for 01 number and icons)
        delayTimeout = setTimeout(() => {
            set({ delayedActiveServiceIndex: index })
        }, 1000)
    },

    // Clear all states immediately
    clearActiveService: () => {
        if (delayTimeout) {
            clearTimeout(delayTimeout)
            delayTimeout = null
        }
        set({
            activeServiceIndex: null,
            delayedActiveServiceIndex: null,
            pendingServiceIndex: null
        })
    }
}))
