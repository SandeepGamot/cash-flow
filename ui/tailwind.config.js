/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cf-black': '#181818',
        'cf-black-soft': '#222222',
        'cf-black-mute': '#282828',
        'cf-text-light-1': '#2c3e50',
        'cf-text-light-2': '#3c3c3ca8',
        'cf-text-dark-1': '#ffffff',
        'cf-text-dark-2': '#ebebeba3'
      }
    }
  },
  plugins: []
}
