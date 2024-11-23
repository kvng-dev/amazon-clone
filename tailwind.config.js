/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amazonClone: {
          background: "#eaeded",
          light_blue: "#232f3a",
          yellow: "#febd69",
          default: "#131921",
        },
      },
    },
  },
  plugins: [],
};
