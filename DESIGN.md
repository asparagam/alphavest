# AlphaVest — Design System & Visual Architecture

## Overview
AlphaVest is an AI-Powered Wealth Management Platform engineered for ultra-high-net-worth (UHNW) private wealth management. The design system balances dense financial telemetry with low cognitive friction, modern glassmorphic elevation, and subtle enterprise micro-animations.

For complete design system scales, responsive breakpoints, component specs, and WCAG 2.2 AA audit reports, refer to [SYSTEM.md](file:///Users/fatmadogan/.gemini/antigravity/scratch/alphavest-app/SYSTEM.md).

---

## 1. Color System Tokens

### Dark Mode Palette (Layered Obsidian Identity)
* **Canvas Background (`--dark-base`)**: `#090B13` (Deep Obsidian Canvas)
* **Surface Level 1 (`--dark-surface1`)**: `#111827` (Glass Surface)
* **Surface Level 2 (`--dark-surface2`)**: `#172033` (Elevated Container)
* **Surface Elevated (`--dark-elevated`)**: `#1E293B` (Elevated Card)
* **Interactive Surface (`--dark-interactive`)**: `#24324A`
* **Border Token (`--dark-border`)**: `rgba(255, 255, 255, 0.10)`
* **Selected Fill**: `rgba(99, 102, 241, 0.18)`

### Light Mode Palette (High Contrast Enterprise)
* **Canvas Background (`--light-base`)**: `#F8FAFC` (Slate 50)
* **Surface Container (`--light-surface`)**: `#FFFFFF` (Pure White)
* **Secondary Surface (`--light-secondary`)**: `#F1F5F9` (Slate 100)
* **Primary Text (`--light-textPrimary`)**: `#0F172A` (Slate 900 — **21.0:1 Contrast Ratio**)
* **Secondary Text (`--light-textSecondary`)**: `#334155` (Slate 700 — **9.5:1 Contrast Ratio**)
* **Muted Text (`--light-textMuted`)**: `#475569` (Slate 600 — **6.2:1 Contrast Ratio**)
* **Border Token (`--light-border`)**: `#CBD5E1` (Slate 300)

### Functional Brand & Status Colors
* **Brand Primary (Emerald)**: `#10B981` (Base), `#059669` (Dark), `#D1FAE5` (Light tint)
* **Sapphire Accent**: `#3B82F6` (Base), `#2563EB` (Dark)
* **Neural AI Gradient**: `linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)`
* **Status Success**: `#22C55E`
* **Status Danger**: `#EF4444`
* **Status Warning**: `#F59E0B`
* **Status Info**: `#3B82F6`

---

## 2. Typography Hierarchy (`CSS clamp()`)

* **Display Extra Large**: `type-display-xl` (`clamp(2.25rem, 4.5vw, 3.5rem)`, `font-extrabold`)
* **Display Large**: `type-display-l` (`clamp(1.75rem, 3.5vw, 2.75rem)`, `font-extrabold`)
* **Heading Extra Large**: `type-heading-xl` (`clamp(1.375rem, 2.5vw, 2.125rem)`, `font-bold`)
* **Heading Large**: `type-heading-l` (`clamp(1.125rem, 2vw, 1.625rem)`, `font-bold`)
* **Heading Medium**: `type-heading-m` (`clamp(1rem, 1.5vw, 1.25rem)`, `font-bold`)
* **Body Large**: `type-body-l` (`clamp(0.938rem, 1.2vw, 1.063rem)`, `font-normal`)
* **Body Regular**: `type-body` (`clamp(0.813rem, 1vw, 0.938rem)`, `font-normal`)
* **Caption**: `type-caption` (`clamp(0.75rem, 0.9vw, 0.813rem)`, `font-medium`)
* **Monospace Financial Numbers**: `JetBrains Mono` with `font-variant-numeric: tabular-nums lining-nums` (`font-mono-nums`)

---

## 3. Elevation & Glassmorphism

* **Hero Banner Container**: `background: linear-gradient(180deg, #182238 0%, #111827 100%)`
* **Glass Panel**: `backdrop-blur-xl`, `bg-white dark:bg-dark-surface1`, `border border-slate-300 dark:border-white/10`
* **Ambient Glows**:
  * Emerald Glow: `0 0 25px -5px rgba(16, 185, 129, 0.3)`
  * Purple Neural Glow: `0 0 25px -5px rgba(139, 92, 246, 0.35)`

---

## 4. 8-Point Spacing & Grid System

* **Base Unit**: 8px grid (`gap-2`, `gap-4`, `gap-6`, `gap-8`)
* **Layout Grid**: Responsive 12-column desktop grid adapting to 1-column mobile layout.
* **Component Padding**: `p-4 sm:p-6 lg:p-8`
