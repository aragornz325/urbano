module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // o 'media' si prefieres que el tema oscuro se active según la configuración del sistema
  theme: {
    extend: {
      //animacion custom para pulsar boton
      animation: {
        customPulse: 'customPulse 0.4s ease-in-out 1',
      },
      keyframes: {
        customPulse: {
          '0%, 100%': { transform: 'scale(1)', backgroundColor: '#c1292e' },
          '20%': { transform: 'scale(1.03)', backgroundColor: '#d1d5db' },
          '40%': { transform: 'scale(1)', backgroundColor: '#c1292e' },
          '60%': { transform: 'scale(1.03)', backgroundColor: '#d1d5db' },
          '80%': { transform: 'scale(1)', backgroundColor: '#d1d5db' },
        },
      },
      colors: {
        brand: {
          primary_text: '#c1292e',
          secondary_text: '#F18F93FF',
          primary: '#c1292e',
          secondary: '#F18F93FF',
          background: '#ffffff',
          active: '#c1292e',
          header_background: '#e2e1e1',
          red: '#c1292e',
          'red-hover': '#c1292e',
          white: '#ffffff',
          'white-hover': '#f2f2f2',
        },
        dark: {
          primary_text: '#c1292e',
          secondary_text: '#F18F93FF',
          primary: '#c1292e',
          background: '#121212',
          active: '#c1292e',
          link: '#04D40EFFFF',
          'header-background': '#1f1f1f',
          red: '#c1292e',
          'red-hover': '#ff4d4d',
          white: '#e2e2e2',
          'white-hover': '#444444',
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
