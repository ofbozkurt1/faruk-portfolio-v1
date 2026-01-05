/**
 * Service Store - Zustand
 * Global state for active service hover
 * Prevents prop-drilling and re-renders
 */

import { create } from 'zustand'

export const useServiceStore = create((set) => ({
    activeServiceIndex: null,
    setActiveService: (index) => set({ activeServiceIndex: index }),
    clearActiveService: () => set({ activeServiceIndex: null })
}))
