/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,vue,ts}',
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.{js,vue,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        footer: '#282727',
        secundary: '#071442',
        'navigation-line': '#F60A0A',
        button: '#4A72FF',
        white: '#FFFFFF',
        grees: {
          DEFAULT: '#5F646D',
          50: '#FFFFFF',
          100: '#F4F5F6',
          200: '#DEE0E3',
          300: '#C8CBD0',
          400: '#B3B6BD',
          500: '#9DA2AA',
          600: '#878D97',
          700: '#727883',
          800: '#5F646D',
          900: '#40434A',
          950: '#313338'
        }
      }
    }
  },
  plugins: []
}
