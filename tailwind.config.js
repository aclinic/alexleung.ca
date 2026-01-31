/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        white: "#fff",
        hover: "#718093",
        black: "#2f3640",
        highlight: "#00D131",
        accent: {
          link: "#60a5fa", // blue-400
          "link-hover": "#93c5fd", // blue-300
          success: "#86efac", // green-300
          warning: "#fcd34d", // yellow-300
          info: "#93c5fd", // blue-300
          primary: "#2563eb", // blue-600
          "primary-hover": "#1d4ed8", // blue-700
        },
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      maxWidth: {
        content: "1170px",
      },
      transitionProperty: {
        all: "all",
      },
      transitionDuration: {
        200: "0.2s",
        500: "0.5s",
      },
      transitionTimingFunction: {
        linear: "linear",
      },
      keyframes: {
        showTopText: {
          "0%": {
            transform: "translate(0, 100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(0, 0)",
            opacity: "1",
          },
        },
      },
      animation: {
        showTopText: "showTopText 1s forwards",
      },

      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
