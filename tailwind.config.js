/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // for Create React App
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          "Inter",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },

      colors: {
        primary: {
          light: "#ff9c8c",
          DEFAULT: "#ff715b",
          dark: "#b34f40",
        },
        accent: {
          grey: "#d3d3d3",
          DEFAULT: "#20c997",
        },
      },
    },
  },
  plugins: [],
};
