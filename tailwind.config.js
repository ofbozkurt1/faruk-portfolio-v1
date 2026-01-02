/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                richBlack: '#050505',
                offWhite: '#F2F2F2',
                dimGray: '#888888',
                accent: '#333333',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            letterSpacing: {
                tightest: '-0.02em',
                widest: '0.05em',
            },
            spacing: {
                '5vw': '5vw',
                '20vh': '20vh',
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.37, 0, 0.63, 1)',
            },
        },
    },
    plugins: [],
}
