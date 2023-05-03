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
        black: ["pangram-black"],
      },
      colors: {
        //main
        "custom-primary": "#F6EFD3",
        "custom-secondary": "#8BD2B9",
        "custom-tertiary": "#312A29",
        //custom
        "custom-green": "#8BD2B9",
        "custom-pink": "#FCE4D8",
        "custom-light": "#F3F1EA",
        "custom-dark": "#232726",
        "custom-red": "#CA2D2D",
        "custom-gray": "#969696",
        shadow: "rgba(82, 82, 82, 0.25)",
      },
      screens: {
        "3xl": "2160px",
        "4xl": "3000px",
      },
      boxShadow: {
        circular: "0px 0px 47px 30px rgba(82, 82, 82,0.31)", //,0.51 "0px 0px 40px 30px rgba(82, 82, 82, 0.10)", //rgba(82, 82, 82, 0.08)
      },
    },
  },
  plugins: [],
};
