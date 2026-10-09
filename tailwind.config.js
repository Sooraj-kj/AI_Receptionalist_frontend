/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172126",
        clinic: "#0f766e",
        mint: "#dff6ef",
        coral: "#f9735b",
        paper: "#f8faf7"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 33, 38, 0.12)"
      }
    },
  },
  plugins: [],
};
