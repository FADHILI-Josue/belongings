/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      screens: {
        '2xl': '1360px',
        'xs': '340px'
      },
      colors: {
        "light-gray": "#F6F6F4",
        "light-gold": "#F5C451",
        "strong-green": "#096A00",
        "light-green": "#36FF00",
        "darkbg": "#1B1C21",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}