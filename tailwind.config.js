/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        spin: 'spin 1s linear infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backgroundImage: {
        "custom-pattern": "url('/src/assets/Background.jpg')",
      },
      logo: {
        "dark-logo": "url('/src/assets/logo.png')",
      },
    },
    colors: {
      chocolate: '#1C110A',
      wheat: '#E4D6A7',
      yellowRed: '#E9B44C',
      darkRed: '#9B2915',
      cadet: '#50A2A7',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

