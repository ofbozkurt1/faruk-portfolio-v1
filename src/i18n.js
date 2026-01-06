/**
 * i18n Configuration
 * Multi-language support for Turkish (TR) and English (EN)
 * Default: Turkish
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Translation files
import translationTR from './locales/tr/translation.json'
import translationEN from './locales/en/translation.json'

const resources = {
    tr: { translation: translationTR },
    en: { translation: translationEN }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'tr',
        lng: 'tr', // Default language
        debug: false,
        interpolation: {
            escapeValue: false // React already escapes
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    })

export default i18n
