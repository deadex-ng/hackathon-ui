/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px',
      '2xl': '1920px',
    },
    extend: {
      colors: {
        'fumbaHome': '#5057FF',
        'fumbaOne': '#5A61FF',
        'fumbaTwo': '#000C1C',
        'fumbaThree': '#2B3B73',
        'fumbaFour': '#334155',
        'fumbaFive': '#000000', 
        'fumbaSix': '#D9D9D9',
        'fumbaSeven': 'rgb(51, 65, 85)',
        'fumbaEight': '#01122E',
      },
    },
  },
  plugins: [],
}
