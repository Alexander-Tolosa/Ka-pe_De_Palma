/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f5',
          100: '#fbeee6',
          200: '#f7dbcc',
          300: '#f0bfa3',
          400: '#e59a72',
          500: '#db7c4a',
          600: '#cd6032',
          700: '#aa4b27',
          800: '#883e23',
          900: '#6f341f',
          950: '#3c180d',
        },
        pool: {
          50: '#f0fafb',
          100: '#dcf4f7',
          200: '#bee9ef',
          300: '#90d6e2',
          400: '#5cb9cc',
          500: '#409cb0',
          600: '#388094',
          700: '#32697b',
          800: '#2f5767',
          900: '#2b4b59',
          950: '#18303c',
        },
        sand: {
          50: '#faf9f5',
          100: '#f3ebd9',
          200: '#e7d7b3',
          300: '#d7bc85',
          400: '#c59d5b',
          500: '#b4833c',
          600: '#9b682e',
          700: '#7e4f25',
          800: '#673f21',
          900: '#56341d',
          950: '#301a0d',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
