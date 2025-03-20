// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // for Flowbite React
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",       // for core Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};
