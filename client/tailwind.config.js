/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5560BD",
        secondary: "#929BE7",
        accent: "#4E60F0",
        background: "#F7F7FA",
        fontColor: "#0E0E0F",
      },
    },
  },
  plugins: [],
};
