/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: 'rgb(var(--color-primary) / <alpha-value>)',
          light: 'rgb(var(--color-light) / <alpha-value>)',
          cyan: 'rgb(var(--color-cyan) / <alpha-value>)',
          pale: 'rgb(var(--color-pale) / <alpha-value>)',
          navy: 'rgb(var(--color-navy) / <alpha-value>)',
          white: 'rgb(var(--color-white) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'Avenir Next', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Baloo 2', 'Avenir Next', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgb(var(--color-navy) / 0.35)',
        glow: '0 0 80px 20px rgb(255 214 150 / 0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
