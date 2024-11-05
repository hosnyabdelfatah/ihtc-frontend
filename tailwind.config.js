/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            screens: {
                'xs': '275px',
                // => @media (min-width: 272px) { ... }
                'sm': '576px',
                // => @media (min-width: 576px) { ... }

                'md': '960px',
                // => @media (min-width: 960px) { ... }

                'lg': '1440px',
                // => @media (min-width: 1440px) { ... }
            },
            keyframes: {
                shimmer: {
                    '100%': {transform: 'translateX(100%)'},
                },
            },
            animation: {
                shimmer: 'shimmer 1.5s infinite',
            },
        },
    },
    plugins: [],
}