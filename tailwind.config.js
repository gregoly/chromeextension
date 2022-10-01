/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        muted: "#6c757d",
        dark: "#343a40",
        light: "#f8f9fa"
      }
    },
  },
  plugins: [],
}
