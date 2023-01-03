/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["mk-hell", "-apple-system", "system-ui", "monospace"],
        secondary: [
          "pangram-regular",
          "-apple-system",
          "system-ui",
          "monospace",
        ],
      },
      colors: {
        //bg
        "main-bg": "#FCE4D8",
        "load-bg": "#8BD2B9",
        //custom
        "slime-green": "#8BD2B9",
        "slime-pink": "#FCE4D8",
        "slime-light": "#F3F1EA",
        "slime-dark": "#232726",
      },
    },
  },
  plugins: [],
};
