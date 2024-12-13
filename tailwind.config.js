/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#2f2f2f",
        beige: "#ffedd5",
        green: "#22c55e",
        blue: "#1d9bf0",
        bor: "#f5f6f7",
        postgray: "#dcdfe0",
        input: "#e8e8e8",
      },
    },
  },
  plugins: [],
};
