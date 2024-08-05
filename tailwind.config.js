/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "400px",
      md: "630px",
      lg: "700px",
    },
    extend: {},
  },
  plugins: [],
}

