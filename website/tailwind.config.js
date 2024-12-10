/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./inertia/**/*.{js,ts,jsx,tsx,vue}",
    "./resources/**/*.edge",
    "./resources/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#5A45FF',
        },
        sand: {
          1: 'var(--sand-1)',
          2: 'var(--sand-2)',
          3: 'var(--sand-3)',
          4: 'var(--sand-4)',
          5: 'var(--sand-5)',
          6: 'var(--sand-6)',
          7: 'var(--sand-7)',
          8: 'var(--sand-8)',
          9: 'var(--sand-9)',
          10: 'var(--sand-10)',
          11: 'var(--sand-11)',
          12: 'var(--sand-12)',
        },
      },
    },
  },
  plugins: [],
}

