/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        tada: {
          '0%, 100%': { transform: 'scale3d(1, 1, 1)' },
          '10%, 20%': { transform: 'scale3d(0.9, 0.9, 0.9) rotate(-6deg)' },
          '30%, 50%, 70%, 90%': { transform: 'scale3d(1.1, 1.1, 1.1) rotate(6deg)' },
          '40%, 60%, 80%': { transform: 'scale3d(1.1, 1.1, 1.1) rotate(-6deg)' },
        },
      },
      animation: {
        tada: 'tada 1s ease-in-out',
      },
    },
  },
  plugins: [],
}