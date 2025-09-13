/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          start: "#23c55e",
          end: "#f7c948"
        },
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(1200px 600px at 80% 10%, rgba(35,197,94,.15), transparent 60%), radial-gradient(800px 400px at 10% 40%, rgba(247,201,72,.12), transparent 60%)'
      }
    },
  },
  plugins: [],
}
