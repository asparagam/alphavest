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
          base: '#070a11',      // Deep Obsidian Base
          surface: '#0d1322',   // Glass Surface
          card: '#131b2e',      // Elevated Card
          border: '#23304d',    // High-contrast Slate Border
          hover: '#1a243d',
        },
        light: {
          base: '#f8fafc',      // Slate 50
          surface: '#ffffff',   // White
          elevated: '#ffffff',  // Crisp Card
          secondary: '#f1f5f9', // Slate 100
          textPrimary: '#0f172a', // Slate 900
          textSecondary: '#475569', // Slate 600
          textMuted: '#64748b', // Slate 500
          border: '#e2e8f0',   // Slate 200
          divider: '#cbd5e1',  // Slate 300
        },
      },
      fontFamily: {
        sans: ['Inter', 'Google Sans', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', 'Google Sans', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'Fira Code', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-light': '0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'purple-glow': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
        'card-elevated': '0 4px 20px -2px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-light': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
