# AlphaVest — Design DNA & System Specification

## Overview
AlphaVest is an AI-Powered Wealth Management Platform engineered for ultra-high-net-worth (UHNW) private wealth management. The design system balances dense financial telemetry with low cognitive friction, modern glassmorphic elevation, and subtle enterprise micro-animations.

---

## 1. Color System Tokens

### Dark Mode Palette (Primary Identity)
* **Canvas Background (`--dark-base`)**: `#070A11` (Deep Midnight Slate)
* **Surface Container (`--dark-surface`)**: `#0D1322` (Translucent Slate Glass)
* **Card Container (`--dark-card`)**: `#131B2E` (Elevated Obsidian Slate)
* **Border Token (`--dark-border`)**: `#23304D` (High-contrast Slate Border)
* **Interactive Hover (`--dark-hover`)**: `#1A243D`

### Light Mode Palette
* **Canvas Background (`--light-base`)**: `#F8FAFC` (Crisp Slate Light)
* **Surface Container (`--light-surface`)**: `#FFFFFF` (Pure White)
* **Border Token (`--light-border`)**: `#E2E8F0` (Soft Neutral Border)

### Functional Brand & Functional Color Tokens
* **Brand Primary (Emerald)**: `#10B981` (Base), `#059669` (Dark), `#D1FAE5` (Light tint), `rgba(16, 185, 129, 0.25)` (Glow)
* **Sapphire Accent**: `#3B82F6` (Base), `#2563EB` (Dark)
* **Neural AI Gradient**: `linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)`
* **Positive Gain**: `#10B981`
* **Negative Loss**: `#EF4444`
* **Warning / Alert**: `#F59E0B`

---

## 2. Typography Hierarchy

* **Primary Body & Interface**: `Google Sans`, `Inter`, system-ui
* **Display & Headings**: `Outfit`, `Google Sans`, sans-serif
* **Monospace Financial Numbers**: `JetBrains Mono`, `Menlo`, monospace

### Type Scale
* **Display Extra Large**: `font-extrabold`, `text-3xl` / `text-4xl`, `tracking-tight`
* **Heading Large**: `font-bold`, `text-2xl`, `tracking-tight`
* **Card Title**: `font-bold`, `text-lg`
* **Body Regular**: `font-normal`, `text-sm`, `leading-relaxed`
* **Label Caps**: `font-bold`, `text-[10px]` / `text-xs`, `uppercase`, `tracking-wider`
* **Metric Numbers**: `font-bold`, `font-mono`, `text-xl` to `text-3xl`

---

## 3. Elevation & Glassmorphism

* **Glass Panel**: `backdrop-blur-xl`, `bg-dark-card/80`, `border border-dark-border/80`, `shadow-glass`
* **Ambient Glows**:
  * Emerald Glow: `0 0 25px -5px rgba(16, 185, 129, 0.3)`
  * Purple Neural Glow: `0 0 25px -5px rgba(139, 92, 246, 0.35)`

---

## 4. Spacing & Grid System

* **Base Unit**: 4px scale (4, 8, 12, 16, 24, 32, 48, 64)
* **Layout Grid**: 12-column fluid responsive desktop grid with 24px gutters.
* **Component Padding**:
  * Metric Cards: `p-6`
  * Buttons: `px-4 py-2.5` (md), `px-6 py-3.5` (lg)
  * Modals: `p-6` with backdrop blur `bg-black/70`

---

## 5. Interaction Patterns & Motion

* **Framer Motion Micro-Interactions**:
  * Buttons: `whileTap={{ scale: 0.98 }}`, `whileHover={{ scale: 1.01 }}`
  * Modals: `initial={{ opacity: 0, scale: 0.95, y: 15 }}`, `animate={{ opacity: 1, scale: 1, y: 0 }}`
  * Tabs: Sliding indicator powered by `layoutId="activeTabBadge"`
