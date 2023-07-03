/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    //merch TODO: needed for merch module reuse
    "./apps/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "white-gradient": `linear-gradient(360.58deg, #FFFFFF 43.76%, rgba(255, 255, 255, 0) 106.82%)`,
        "ait-gradient":
          "linear-gradient(0deg, rgba(156,217,204,1) 37%, rgba(2,1,2,1) 37%)",
      },
      fontFamily: {
        primary: ["mk-hell", "-apple-system", "system-ui", "monospace"],
        secondary: [
          "pangram-regular",
          "-apple-system",
          "system-ui",
          "monospace",
        ],
        black: ["pangram-black"],
        bold: ["pangram-bold"],
        neuebit: ["neuebit"],
        "neuebit-bold": ["neuebit-bold"],
      },
      colors: {
        //main
        "custom-primary": "#f9f1d9", // "#F6EFD3",
        "custom-secondary": "#8BD2B9",
        "custom-tertiary": "#312A29",
        //custom
        "custom-green": "#8BD2B9",
        "custom-pink": "#FCE4D8",
        "custom-light": "#F3F1EA",
        "custom-dark": "#232726",
        "custom-red": "#CA2D2D",
        "custom-gray": "#969696",
        //all in time
        "ait-teal": "#9CD9CC",
        "ait-black": "#020102",
        "ait-gray": "#E8E8E8",
        shadow: "rgba(82, 82, 82, 0.25)",
        // slimes hub
        "slimes-black": "#2E2929",
        "slimes-border": "#BDBDBD",
        //version 2 theme
        "v2-pink": "#FFB094",
        "v2-beige": "#F6EFD3", // "#F6EFD3",
        "v2-green": "#73EEC5",
        "v2-dark-green": "#5CBE9D",
        "v2-dark": "#2C2524",
        //merch TODO: needed for merch module reuse
        "m-light-gray": "#EDEDED",
        "m-mid-gray": "#505050",
        "m-red": "#FF4747",
        "m-green": "#2E6636",
        "m-dark-green": "#24512b",
        "m-black": "#010206",
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
