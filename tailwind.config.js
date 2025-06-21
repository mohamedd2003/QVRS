/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F8F5',
          100: '#D1F2EB',
          200: '#A3E4D7',
          300: '#76D7C4',
          400: '#48C9B0',
          500: '#1ABC9C',
          600: '#16A085',
          700: '#138D75',
          800: '#117A65',
          900: '#0E6655'
        },
        secondary: {
          50: '#E8F6F3',
          100: '#D5EDE8',
          200: '#ABEBD2',
          300: '#82E9BB',
          400: '#58D68D',
          500: '#2ECC71',
          600: '#27AE60',
          700: '#229954',
          800: '#1E8449',
          900: '#196F3D'
        },
        accent: {
          50: '#FDF4E3',
          100: '#FCE9C7',
          200: '#F8D48F',
          300: '#F4BE57',
          400: '#F0A91F',
          500: '#F39C12',
          600: '#E67E22',
          700: '#D35400',
          800: '#BA4A00',
          900: '#A04000'
        }
      },
      fontFamily: {
        'arabic': ['Amiri', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [flowbitePlugin],
}