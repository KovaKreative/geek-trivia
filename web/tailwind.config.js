/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-pattern': "url('./assets/bgQuestionMarkSeamless.png')"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'base'
    })
  ],
}

