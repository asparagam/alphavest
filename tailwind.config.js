/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          glow: 'rgba(16, 185, 129, 0.25)',
        },
        accent: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          glow: 'rgba(59, 130, 246, 0.25)',
        },
        ai: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          glow: 'rgba(139, 92, 246, 0.3)',
        },
        dark: {
          base: '#070a11',
          surface: '#0d1322',
          card: '#131b2e',
          hover: '#1a243d',
          border: '#23304d',
          muted: '#34466d'
        },
        light: {
          base: '#f8fafc',
          surface: '#ffffff',
          card: '#ffffff',
          hover: '#f1f5f9',
          border: '#e2e8f0',
          muted: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Google Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Google Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'blue-glow': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
        'purple-glow': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
