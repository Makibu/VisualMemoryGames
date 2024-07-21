/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'anonPro': ['Anonymous Pro', 'sans-serif']
            },
            colors: {
                'c-orange': '#FF7A00',
                'c-black': '#101010',
                'grayLight': '#AFAFAF',
                'grayDark': '#48484870',
            },
            boxShadow: {
                "orangeNeon": '0 0 50px 0 #FF7A0070'
            },
            border: {
                "orangeStroke": '1px solid #FF7A00'
            },
        },
    },
    plugins: [],
}