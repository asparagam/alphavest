# AlphaVest — Enterprise System Architecture

## Architecture Overview
AlphaVest is designed as a high-performance, single-page client enterprise web application (SPA) built with React 19, TypeScript, and Vite. The frontend enforces strict state isolation, zero-latency local data mutations, and responsive glassmorphic rendering.

```
                  ┌─────────────────────────────────────────┐
                  │              App Root                   │
                  │   (QueryClientProvider, Router, Theme)  │
                  └────────────────────┬────────────────────┘
                                       │
                  ┌────────────────────▼────────────────────┐
                  │          PortfolioProvider              │
                  │ (Assets, Trades, Cash, Rebalance State) │
                  └────────────────────┬────────────────────┘
                                       │
                  ┌────────────────────▼────────────────────┐
                  │         NotificationProvider            │
                  │  (Toast Queue, System Alert Stream)     │
                  └────────────────────┬────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
┌───────▼────────┐             ┌───────▼────────┐             ┌───────▼────────┐
│  Layout Shell  │             │   Page Views   │             │   AI Copilot   │
│(Sidebar/TopNav)│             │ (11 Routes)    │             │ (Neural Model) │
└────────────────┘             └────────────────┘             └────────────────┘
```

---

## Technical Stack & Rationale

* **React 19 & TypeScript**: Provides type safety across all financial models, components, and order parameters.
* **Vite**: Ultra-fast build pipeline and instant HMR dev server.
* **Tailwind CSS v3**: Utility-first styling with custom token extensions for glassmorphism, brand glows, and dark/light themes.
* **React Router v6**: Client-side routing across 11 dedicated pages.
* **TanStack Query (React Query)**: Standardized data fetching and cache management ready for backend API integration.
* **Recharts**: High-performance SVG area, line, and pie chart visualizations.
* **React Hook Form & Zod**: Schema validation for order entry and user profile settings.
* **Framer Motion**: Hardware-accelerated fluid micro-animations.
* **Lucide React**: Modern iconography matching Stitch visual standards.

---

## State Management Flow

1. **PortfolioContext**: Manages active positions, cash reserves, live net worth calculations, order execution simulation, and watchlist state.
2. **NotificationContext**: Manages global toast alerts with auto-dismiss timeouts and system communications.
3. **ThemeContext**: Controls system theme class persistence (`dark` / `light`) on `document.documentElement`.
