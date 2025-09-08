/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        w: "#EEF1F6",
        ts: "#6d81c8",
        hb: "#407C87",
        c: "#D3E1E2",
      },
      fontFamily: {
        
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
       
        serif: ['Lora', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require("daisyui")],
};

