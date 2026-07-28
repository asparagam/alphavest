# AlphaVest — AI-Powered Wealth Management Platform

AlphaVest is a production-quality enterprise wealth management platform built using React 19, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, Recharts, and Framer Motion. It converts the Google Stitch project design into a fully interactive, responsive, accessible frontend application.

---

## Key Features & Pages

* **Dashboard**: Portfolio value, today's/total return, benchmark comparison (S&P 500), interactive Recharts area chart with hover tooltips, legend toggles, time range selection, AI insights, sector pie chart, monthly returns heatmap.
* **Portfolio**: Holdings table with sorting, category filtering (Stocks, Crypto, ETFs, Bonds, Cash), total returns, risk scores, sparklines, and auto-rebalance actions.
* **Asset Details**: Deep dive page for individual tickers (e.g. NVDA, AAPL, BTC) with price history chart, key stats, analyst consensus, and trade shortcuts.
* **Trading Desk**: Enterprise order entry supporting Buy/Sell/Swap, Market/Limit/Stop-Loss orders, slippage controls, order book depth simulator, and order confirmation dialog.
* **Analytics**: Sharpe Ratio, Alpha, Beta, Max Drawdown, and 12-month Monte Carlo simulation graph (5th, 50th, 95th percentile confidence bands).
* **Reports**: Downloadable PDF and CSV reports for tax-loss harvesting, quarterly wealth statements, and ESG audits.
* **AI Copilot**: Interactive neural assistant with simulated responses, quick strategy prompts, rebalance execution, and disclaimer notices.
* **Notifications**: Filterable notification center with read/unread statuses and live toast triggers.
* **Security**: Multi-factor authentication (2FA) toggle, biometric login settings, session revocation, API key generator, and emergency lock switch.
* **Settings**: Dark/Light mode toggle, base reporting currency selector, investor risk profile settings, and AI model aggressiveness.
* **Profile**: Private wealth investor profile, tier badge, verified net worth, wealth advisor contact, and linked custody accounts.

---

## Tech Stack

* **Core**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS v3, Custom Glassmorphic Tokens, PostCSS, Autoprefixer
* **Routing**: React Router v6
* **Data & State**: Context API, TanStack Query (React Query)
* **Charts**: Recharts
* **Form & Validation**: React Hook Form, Zod
* **Animation**: Framer Motion
* **Icons**: Lucide React

---

## Quick Start & Setup

### Prerequisites
* Node.js v18+ and npm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## Vercel Deployment

The application is fully optimized for Vercel deployment:
- Production bundle size optimized with Vite code splitting
- Zero backend required (runs completely with realistic mock JSON telemetry)

---

## Disclaimer

> **AlphaVest is a conceptual enterprise FinTech product created for UX/UI portfolio purposes. It does not provide financial services, execute trades, or offer investment advice.**
