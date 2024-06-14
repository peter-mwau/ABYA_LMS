/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    // "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-line-clamp'),
  ],
}

