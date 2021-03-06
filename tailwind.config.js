const { blue, green, white, red } = require('tailwindcss/colors');

module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue,
      red,
      green,
      white,
      'mine-shaft': {
        '50': '#f5f5f5',
        '100': '#eaeaeb',
        '200': '#cbcccc',
        '300': '#acadae',
        '400': '#6e6f71',
        '500': '#303134',
        '600': '#2b2c2f',
        '700': '#202124',
        '800': '#1d1d1f',
        '900': '#181819',
      },
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
