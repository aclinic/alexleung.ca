/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: '#fff',
        hover: '#718093',
        black: '#2f3640',
        highlight: '#00D131',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      maxWidth: {
        content: '1170px',
      },
      transitionProperty: {
        all: 'all',
      },
      transitionDuration: {
        200: '0.2s',
        500: '0.5s',
      },
      transitionTimingFunction: {
        linear: 'linear',
      },
      keyframes: {
        showTopText: {
          '0%': { 
            transform: 'translate(0, 100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translate(0, 0)',
            opacity: '1'
          },
        }
      },
      animation: {
        showTopText: 'showTopText 1s forwards',
      },
    },
  },
  plugins: [],
}
