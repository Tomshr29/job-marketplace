/** @type {import('tailwindcss').Config} */
export default {
  content: ["./inertia/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
