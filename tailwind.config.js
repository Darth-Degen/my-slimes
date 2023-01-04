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
        //main
        "custom-primary": "#8BD2B9",
        "custom-secondary": "#FCE4D8",
        //custom
        "custom-green": "#8BD2B9",
        "custom-pink": "#FCE4D8",
        "custom-light": "#F3F1EA",
        "custom-dark": "#232726",
      },
      screens: {
        "3xl": "2160px",
        "4xl": "3000px",
      },
    },
  },
  plugins: [],
};
