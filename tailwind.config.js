/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C5F2D',
          light: '#3A7A3B',
          dark: '#1E4020',
        },
        secondary: {
          DEFAULT: '#8B7355',
          light: '#A38969',
          dark: '#6F5E44',
        },
        accent: {
          DEFAULT: '#FFC857',
          light: '#FFD678',
          dark: '#E6B34E',
        },
        background: '#F8F9FA',
        surface: '#FFFFFF',
        text: {
          primary: '#2B2D42',
          secondary: '#5A5C6E',
          tertiary: '#8F90A6',
        },
        difficulty: {
          easy: '#28A745',
          moderate: '#FFC107',
          difficult: '#FD7E14',
          veryDifficult: '#DC3545',
          expert: '#6F42C1',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Courier New', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
        '20': '5rem',    // 80px
        '24': '6rem',    // 96px
      },
    },
  },
  plugins: [],
}
