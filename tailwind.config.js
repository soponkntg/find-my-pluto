const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        navbar: "0px 5px 20px rgba(0, 0, 0, 0.25)",
        filter: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        color: "0px 2px 4px rgba(0, 0, 0, 0.5)",
        input: "inset -5px -5px 7px #FFFFFF, inset 5px 5px 7px rgba(174, 174, 192, 0.4);",
      },
      backgroundImage: {
        page: "url('/background.jpeg')",
        "gradient-image": "var(--gradient-image)",
      },
      colors: {
        primary: "#302A58",
        secondary: "#8778EE",
        tertiary: "#BDB4FF",
        "dim-secondary": "rgba(189, 180, 255, 0.7)",
        dark: "#24273F",
        dimWhite: "#CBD2E0",
        neutrals: {
          300: "#E2E7F0",
          800: "#CFCFCF",
        },
        "detail-card": "rgba(36, 39, 63, 0.8)",
        blackdrop: "rgb(0,0,0,0.7)",
      },
      fontFamily: {
        sans: ["var(--font-prompt)", ...fontFamily.sans],
      },
    },
    screens: {
      xs: "480px",
      sm: "620px",
      md: "891px",
      lg: "1060px",
      xl: "1340px",
    },
  },
  plugins: [],
};
