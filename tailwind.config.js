/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Asegura que Tailwind escanee los archivos de React
    "./public/index.html",         // Incluye el HTML de `public`
  ],
  theme: {
    extend: {
      colors: {
        'scry': '#3FC1B2', // color principal Scry
        'chat-bg': '#FFFFFF',
        'chat-dark-bg': '#343541',
        'chat-card': '#f7f7f8',
        'chat-text': '#202123',
        'chat-secondary-text': '#6e6e80',
      },
      fontFamily: {
        'sans': ['Inter', 'IBM Plex Sans', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
