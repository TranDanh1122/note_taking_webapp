/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        mb: { min: "0", max: "767px" },
        tb: { min: "767px", max: "1023px" }
      }
    },
  },
  plugins: [],
}

