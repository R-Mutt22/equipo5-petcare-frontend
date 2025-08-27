/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [require("daisyui")],
};

