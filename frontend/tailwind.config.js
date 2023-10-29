/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'sans'],
      },
    },
  },
  plugins: [],
}

