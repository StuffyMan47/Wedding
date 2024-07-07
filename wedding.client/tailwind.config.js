/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                backgroundGreen: '#F0F5ED',
                buttonGreen: '#455646'
            },
        },
        fontFamily: {
            cormorantInfant: ['Cormorant Infant'],
        },
        container: {
            center: true,
        },
        borderWidth: {
            DEFAULT: '1px',
            '0': '0',
            '2': '2px',
            '3': '3px',
            '4': '4px',
            '6': '6px',
            '8': '8px',
            '15': '15px',
            '20': '20px',
            '25': '25px',
        }
    },
    plugins: [],
}