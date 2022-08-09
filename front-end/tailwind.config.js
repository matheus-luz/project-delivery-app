/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        trybe: {
          primary: {
            light: '#03d09c',
            DEFAULT: '#036b52',
            dark: '#01382a',
          },
          secondary: {
            DEFAULT: '#2fc18c',
            dark: '#1e9f6e',
          },
          purple: '#421981',
          blue: '#421981',
        },
      },
    },
  },

  plugins: [],
};
