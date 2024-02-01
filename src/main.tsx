import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { initReactI18next } from 'react-i18next'
import App from './App.tsx'
import { DateFormatProvider } from './context/DateFormatContext.tsx'
import './styles/global.css'
import { localeKeys, locales } from './util/locales.ts'

// @ts-expect-error: Virtual PWA register
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // debug: true,
        detection: {
            order: [
                'querystring',
                'localStorage',
                'cookie',
                'sessionStorage',
                'navigator',
                'htmlTag',
                'path',
                'subdomain',
            ],
            lookupQuerystring: 'lng',
            lookupCookie: 'lng',
            lookupLocalStorage: 'lng',
            lookupSessionStorage: 'lng',
        },
        resources: locales,
        supportedLngs: localeKeys,
        fallbackLng: 'en',
    })

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DateFormatProvider>
            <App />
        </DateFormatProvider>
    </React.StrictMode>
)
