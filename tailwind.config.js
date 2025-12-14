/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#0a192f', // Deepest Navy (Background)
          800: '#112240', // Card Background
          700: '#233554', // Lighter Navy
        },
        accent: {
          cyan: '#64ffda', // Bright pop for buttons/icons
          purple: '#bd34fe', // Matches the purple in your logo
        }
      }
    },
  },
  plugins: [],
}