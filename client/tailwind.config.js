/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      backgroundImage:{
        'phone-ls-bg':"url('/images/phone-bg.jpg')"
      }
    },
  },
  plugins: [],
}