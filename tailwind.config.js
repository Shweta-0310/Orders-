/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          0: '#ffffff',
          25: '#fcfcfd',
          50: '#f9fafb',
          100: '#f2f4f8',
          150: '#eceff3',
          200: '#e1e4ea',
          300: '#cdd0d5',
          400: '#99a0ae',
          500: '#717784',
          600: '#525866',
          700: '#2b303b',
          800: '#222530',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
        },
        purple: {
          50: '#faf5ff',
          500: '#a855f7',
        },
      },
      boxShadow: {
        'xs': '0px 1px 1px 0px rgba(5,5,6,0.04)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
      },
    },
  },
  plugins: [],
}
