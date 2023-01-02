/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["PressStart", "-apple-system", "system-ui", "monospace"],
        pressStart: ["PressStart"],
        daysOne: ["DaysOne"],
      },
      colors: {
        dark: "#121212",
        lightRed: "#ff9596",
        customDarkGray: "#222222",
        customMidGray: "#303030",
        customRed: "#cf1714",
        // orange -> #fdba74
        // red -> #f87171
      },
    },
  },
  plugins: [],
};
