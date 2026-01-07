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

    // Set active service IMMEDIATELY (no delay)
    setActiveService: (index) => {
        // Clear any existing timeout (legacy)
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
        }

        // Set both pending and active immediately
        set({ pendingServiceIndex: index, activeServiceIndex: index })
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
