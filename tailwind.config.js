/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
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
            },
            colors: {
                primary: '#f3f4f6',
                secondary: '#4f46e5',
                darkPrimary: '#3730a3',
                darkSecondary: '#06b6d4',
                default: '#1e293b',
                darkDefault: '#cbd5e1'
            }
        }
    },
    plugins: []
}
