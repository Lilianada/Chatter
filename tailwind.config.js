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
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      green: {
        100: "#f0fff4",
        200: "#c6f6d5",
        300: "#9ae6b4",
        400: "#68d391",
        600: "#527b46",
        700: "#3f5e36",
        800: "#2d3e24",
        900: "#1a1f14",
      },
      chocolate: '#1C110A',
      wheat: '#E4D6A7',
      cadet: '#50A2A7',
      yellow: {
        100: "hsl(40, 94%, 95%)",
        200: "hsl(40, 94%, 90%)",
        300: "hsl(40, 94%, 85%)",
        400: "hsl(40, 94%, 80%)",
        500: "#E9B44C",
        600: "hsl(40, 94%, 70%)",
        700: "hsl(40, 94%, 65%)",
        800: "hsl(40, 94%, 20%)",
        900: "hsl(40, 94%, 10%)",
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a",
      },
      gray: {
        50:  "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712",
      },
      red:{ 
        400: '#9b2915b8',
        500: '#9B2915',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

