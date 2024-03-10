/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1476ff",
        secondary: "#f3f5ff",
        light: "#f9faff",
      },
      keyframes: {
        scrolling: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "trans": "scrolling"
      }
    },
  },
  plugins: [],
};
