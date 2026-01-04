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
            backgroundImage: {
                'topography': "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.374 1.949.74 2.999 1.08l2.972 1.057-2.972 1.057c-1.05.34-2.044.706-2.999 1.08C65.362 26.778 60.271 28 50 28c-10.353 0-16.36-1.347-25.96-4.937l-1.768-.661c-.368-.138-.731-.272-1.088-.402l2.972-1.057 2.972-1.057C36.64 18.653 42.647 20 50 20c4.348 0 7.856.322 11.23.956.337.064.672.126 1.005.186.333-.06.668-.122 1.005-.186C66.144 20.322 69.652 20 74 20c7.353 0 13.36 1.347 22.96 4.937l1.768.661 1.088.402-1.088.402-1.768.661C87.36 30.653 81.353 32 74 32c-7.353 0-13.36-1.347-22.96-4.937-.955-.374-1.949-.74-2.999-1.08l-2.972-1.057 2.972-1.057c1.05-.34 2.044-.706 2.999-1.08C60.64 19.222 66.647 18 74 18c10.353 0 16.36 1.347 25.96 4.937l1.768.661.357.13.72.264V0h-100v20z' fill='%23FFFFFF' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            },
        },
    },
    plugins: [],
}
