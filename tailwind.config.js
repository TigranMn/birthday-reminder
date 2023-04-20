/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontSize: {
                xxl: '22px',
                '3xxl': '32px',
                '5xxl': '52px'
            },
            lineHeight: {
                8.5: '34px',
                12: '48px',
                21: '72px'
            }
        }
    },
    plugins: []
}
