/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}', // Adjust for your file structure
    './components/**/*.{js,jsx,ts,tsx}', // Adjust for your file structure
    './src/**/*.{js,jsx,ts,tsx}', // Ensure this is included if using src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        cabin: ['Cabin', 'sans-serif'], // Adding Cabin font
      },
    },
  },
  plugins: [],
};
