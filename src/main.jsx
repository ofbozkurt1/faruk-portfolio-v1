import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

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
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
