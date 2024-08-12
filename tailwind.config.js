/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        currentColor: '#eee', // Define your custom color here
        // Add more custom colors if needed
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

