/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'small': { 'raw': '(max-height: 600px)' },
        // => @media (min-height: 800px) { ... }
      }
    },
  },
  plugins: [],
};
