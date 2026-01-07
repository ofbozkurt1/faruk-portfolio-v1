/**
 * Language Transition Store - Zustand
 * Manages cinematic wipe transition state
 */

import { create } from 'zustand'

export const useLanguageTransitionStore = create((set) => ({
    isTransitioning: false,
    pendingLanguage: null,

    // Start transition
    startTransition: (targetLanguage) => set({
        isTransitioning: true,
        pendingLanguage: targetLanguage
    }),

    // End transition
    endTransition: () => set({
        isTransitioning: false,
        pendingLanguage: null
    })
}))
