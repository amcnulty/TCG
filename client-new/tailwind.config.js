/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#C85A0A',
          'orange-dark': '#A84808',
          'orange-light': '#E06B1A',
          dark: '#1A1A1A',
          'off-white': '#F7F6F4',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
