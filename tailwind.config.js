/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./src/**/*.{html,jsx,tsx,ts,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".bg-sailx": { "background-color": "#0d131d" },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
