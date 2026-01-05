/**
 * Portfolio Store - Zustand
 * Global state for active project hover
 * Prevents prop-drilling and re-renders
 */

import { create } from 'zustand'

export const usePortfolioStore = create((set) => ({
    activeProjectId: null,
    activeProjectColor: null,
    setActiveProject: (id, color) => set({ activeProjectId: id, activeProjectColor: color }),
    clearActiveProject: () => set({ activeProjectId: null, activeProjectColor: null })
}))
