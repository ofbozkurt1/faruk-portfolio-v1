import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n' // i18n initialization

// Disable browser scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

// Remove any hash from URL on load
if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname)
}

// Scroll to top immediately
window.scrollTo(0, 0)

// Also scroll after a small delay (after DOM is ready)
setTimeout(() => {
    window.scrollTo(0, 0)
}, 0)

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
