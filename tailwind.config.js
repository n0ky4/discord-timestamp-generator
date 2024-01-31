/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Catamaran', 'sans-serif'], // google font that is similar to the discord font
                mono: ['Consolas', 'monospace'],
            },
            colors: {
                blurple: {
                    400: '#5468ff', // button normal
                    500: '#4753c5', // button hover
                },
                red: '#ed4245',
                gray: {
                    100: '#6c6f79', // button hover
                    200: '#4f5158', // button normal
                    300: '#3f4147', // timestamp bg
                    400: '#303238', // normal bg
                    500: '#2b2d31', // codeblock bg
                    600: '#1f1e22', // codeblock border
                },
                color: {
                    300: '#f2f3f5', // bold text
                    400: '#dbdee1', // codeblock text
                    500: '#b3b6be', // icons
                    600: '#939aa1', // normal text
                    700: '#86888c', // placeholder text
                },
            },
        },
    },
    plugins: [
        require('@headlessui/tailwindcss'),
        require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    ],
}
