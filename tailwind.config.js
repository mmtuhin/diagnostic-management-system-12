/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter : "'Inter', sans-serif"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night", "corporate"],
    darkTheme: "night", // name of one of the included themes for dark mode
    
  },
  darkMode: ['class', '[data-theme="night"]']
}

