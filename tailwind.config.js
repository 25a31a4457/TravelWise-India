/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070f1e',
          900: '#0b192c',
          800: '#152b47',
          700: '#1e3a5f',
          600: '#2c5282',
        },
        emerald: {
          850: '#064e3b',
          750: '#047857',
        },
        saffron: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(11, 25, 44, 0.08)',
        'premium': '0 20px 40px -15px rgba(11, 25, 44, 0.12)',
        'glow': '0 0 25px -5px rgba(249, 115, 22, 0.3)',
      }
    },
  },
  plugins: [],
}
