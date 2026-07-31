import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Stripe Emerald
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Sapphire Accent
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        ai: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Linear Purple
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        dark: {
          base: '#090b13',        // Deep Obsidian Canvas
          surface1: '#111827',    // Surface Level 1
          surface2: '#172033',    // Surface Level 2
          elevated: '#1e293b',    // Surface Elevated Card
          interactive: '#24324a', // Interactive Surface
          border: 'rgba(255,255,255,0.10)',
          divider: 'rgba(255,255,255,0.06)',
          hover: 'rgba(255,255,255,0.04)',
          selected: 'rgba(99,102,241,0.18)',
        },
        // High Contrast WCAG 2.2 AA Light Mode Tokens
        light: {
          base: '#f8fafc',
          surface: '#ffffff',
          elevated: '#ffffff',
          secondary: '#f1f5f9',
          textPrimary: '#0f172a',    // Slate 900 (21:1 Contrast)
          textSecondary: '#334155',  // Slate 700 (9.5:1 Contrast)
          textMuted: '#475569',      // Slate 600 (6.2:1 Contrast - exceeds 4.5:1 requirement)
          border: '#cbd5e1',         // Slate 300
          divider: '#94a3b8',        // Slate 400
        },
        status: {
          success: '#22c55e',
          danger: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
          neutral: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Google Sans', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', 'Google Sans', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'Fira Code', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-light': '0 4px 16px -2px rgba(15, 23, 42, 0.08), 0 2px 4px -1px rgba(15, 23, 42, 0.04)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'purple-glow': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'card-elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.10)',
        'card-light': '0 1px 3px 0 rgba(15, 23, 42, 0.10), 0 1px 2px -1px rgba(15, 23, 42, 0.06)',
      },
      backgroundImage: {
        'hero-gradient-dark': 'linear-gradient(180deg, #182238 0%, #111827 100%)',
        'hero-gradient-light': 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
      },
    },
  },
  plugins: [],
};
