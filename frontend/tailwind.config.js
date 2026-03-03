/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        milkman: {
          blue: '#6BB0D3',
          red: '#EF4444',
          'light-blue': '#E0F2F7', // A very light blue
          'primary-blue': '#A7D9ED', // A soft, primary light blue
          'dark-blue': '#6BB0D3', // A slightly darker blue for accents
          'white': '#FFFFFF', // Pure white
          'off-white': '#F8F8F8', // Off-white for backgrounds
        }
      },
    },
  },
  plugins: [],
}
