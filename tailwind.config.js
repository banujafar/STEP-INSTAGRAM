/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "like-white": "#fffeee",
        'black-rgba': 'rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
