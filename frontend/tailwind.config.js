/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d0d0d',
          dark: '#0d0d0d',
          light: '#ffffff'
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          dark: '#1a1a1a',
          light: '#f8f9fa'
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5'
        },
        textLight: {
          DEFAULT: '#ffffff',
          dark: '#ffffff',
          light: '#1a1a1a'
        },
        textMuted: {
          DEFAULT: '#9ca3af',
          dark: '#9ca3af',
          light: '#6b7280'
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}
