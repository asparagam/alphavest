import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Standardized Enterprise FinTech Primary Brand Colors
        brand: {
          50: '#ecfdf3',  // Subtle Green Background
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#16c784', // Primary Emerald Green
          600: '#12b76a', // Hover State
          700: '#0f9f5f', // Pressed State
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        ai: {
          50: '#f3e8ff',  // Subtle Purple AI Background
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7c3aed', // Primary AI Purple
          600: '#6d28d9', // Hover State
          700: '#5b21b6', // Pressed State
          800: '#4c1d95',
          900: '#3b0764',
        },
        accent: {
          50: '#eff6ff',  // Subtle Blue Accent Background
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Primary Accent Blue
          600: '#2563eb', // Hover State
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // Dark Theme Surface Hierarchy (Obsidian FinTech System)
        dark: {
          base: '#0B1020',        // Level 0: App Canvas (#0B1020)
          page: '#101827',        // Level 1: Content Canvas (#101827)
          hero: '#172033',        // Level 2: Hero Panels (#172033)
          card: '#1B2436',        // Level 3: Primary Cards (#1B2436)
          surface1: '#172033',    // Level 2 Alias
          surface2: '#222C41',    // Level 4: Secondary Cards (#222C41)
          elevated: '#263249',    // Level 5: Elevated Containers (#263249)
          interactive: '#2C3850', // Interactive Surfaces
          border: 'rgba(255,255,255,0.06)',
          borderHover: 'rgba(255,255,255,0.10)',
          divider: 'rgba(255,255,255,0.06)',
          hover: 'rgba(255,255,255,0.04)',
          selected: 'rgba(99,102,241,0.18)',
        },

        // Light Theme Surface Hierarchy (Clean SaaS Elevation)
        light: {
          base: '#f7f8fa',        // Level 0: App Background
          surface1: '#f9fafb',    // Level 1: Page Content Canvas
          surface2: '#ffffff',    // Level 2: Cards
          elevated: '#ffffff',    // Level 3: Elevated Surface
          secondary: '#f4f6f8',   // Level 4: Secondary Surface
          tertiary: '#eef2f7',    // Level 5: Tertiary Surface
          textPrimary: '#111827', // Slate 900
          textSecondary: '#4b5563',// Slate 600
          textMuted: '#6b7280',   // Slate 500
          border: '#e2e8f0',      // Slate 200 Border
          divider: '#cbd5e1',     // Slate 300 Divider
        },

        // WCAG 2.2 AA Status Tokens
        status: {
          success: '#16c784',
          danger: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
          neutral: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Google Sans', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', 'Google Sans', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'Fira Code', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        'glass': '0 10px 30px rgba(0,0,0,0.28), 0 2px 10px rgba(0,0,0,0.18)',
        'glass-light': '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'emerald-glow': '0 0 25px -5px rgba(22, 199, 132, 0.3)',
        'purple-glow': '0 0 25px -5px rgba(124, 58, 237, 0.35)',
        'card-elevated': '0 10px 30px rgba(0,0,0,0.28), 0 2px 10px rgba(0,0,0,0.18)',
        'card-light': '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
};
