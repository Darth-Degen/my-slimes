/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["PressStart", "-apple-system", "system-ui", "monospace"],
      },
      colors: {
        "slime-green": "#8BD2B9",
        "slime-pink": "#FCE4D8",
        "slime-light": "#F3F1EA",
        "slime-dark": "#232726",
      },
    },
  },
  plugins: [],
};
