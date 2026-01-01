/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14b8a6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
        },
        background: '#fefbf6',
        foreground: '#1f2937',
        card: '#ffffff',
        border: '#e5e7eb',
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(20, 184, 166, 0.3)',
        'glow-secondary': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'emoji-bounce': 'emojiBounce 0.6s ease-out',
        'pulse-success': 'pulseSuccess 0.5s ease-out',
        'shake-error': 'shakeError 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        emojiBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSuccess: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
        },
        shakeError: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [],
}

