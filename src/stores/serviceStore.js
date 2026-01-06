/**
 * Service Store - Zustand
 * Global state for active service hover
 * With 3 second delay before showing background animation
 */

import { create } from 'zustand'

let hoverTimeout = null

export const useServiceStore = create((set) => ({
    activeServiceIndex: null,
    pendingServiceIndex: null,

    // Set active service with 3 second delay
    setActiveService: (index) => {
        // Clear any existing timeout
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
        }

        // Set pending immediately (for local UI feedback)
        set({ pendingServiceIndex: index })

        // Set active after 1 second (for background animation)
        hoverTimeout = setTimeout(() => {
            set({ activeServiceIndex: index })
        }, 1000)
    },

    // Clear active service immediately
    clearActiveService: () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            hoverTimeout = null
        }
        set({ activeServiceIndex: null, pendingServiceIndex: null })
    }
}))
