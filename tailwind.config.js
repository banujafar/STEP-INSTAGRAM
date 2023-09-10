/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "like-white": "#fffeee",
        'black-rgba': 'rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'ig-phone': "url('https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk')"
      }
    },
  },
  plugins: [],
};
