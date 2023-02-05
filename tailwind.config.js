/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT( {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif',],
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'primary-headding':'#5AB55E',
      'red':'#F44336',
      'secondary-headding': '#2196F3',
      'pera': '#FFC107',
    },
    
  },
  plugins: [],
}
)
