const {
  blue,
  trueGray,
  green,
  white,
  warmGray,
} = require('tailwindcss/colors');

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue,
      gray: trueGray,
      warmGray,
      green,
      white,
    },
    extend: {
      animation: {
        slide: 'slide 0.6s',
        spring: 'spring 0.6s',
      },
      keyframes: {
        slide: {
          '0%': { opacity: 0, transform: 'translateX(-100px)' },
          '60%': {
            opacity: 1,
            transform: 'translateX(20px)',
          },
          '100%': { transform: 'translateX(0)' },
        },
        spring: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.5)',
          },
          '60%': {
            opacity: 1,
            transform: 'scale(1.2)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
