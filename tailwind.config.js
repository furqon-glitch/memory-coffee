/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0E0E",
        cream: "#EFEBE2",
        amber: "#E6A94E",
        muted: "#B6B2A8",
        terracotta: "#C67D3E",
      },
      fontFamily: {
        display: ["Figtree", "sans-serif"],
        body: ["Inter", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
};
