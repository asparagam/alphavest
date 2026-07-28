# AlphaVest — Accessibility & WCAG 2.2 AA Compliance Audit

## WCAG 2.2 AA Standards Implementation

AlphaVest strictly adheres to Web Content Accessibility Guidelines (WCAG 2.2 Level AA) to guarantee full usability for screen readers, keyboard-only users, and high-contrast preferences.

---

## Key Features

### 1. High Contrast Ratios (WCAG 1.4.3)
* Dark Mode background `#070A11` combined with `#F8FAFC` text yields a contrast ratio exceeding **18:1** (exceeds the 4.5:1 requirement).
* Primary Emerald `#10B981` badges and buttons use dark background overlays to maintain high legibility.

### 2. Full Keyboard Navigability (WCAG 2.1.1)
* All interactive controls (`button`, `input`, `select`, `a`) feature high-visibility outline focus rings (`focus-visible:ring-2 focus-visible:ring-brand-500`).
* Global search accessible via `Cmd+K` / `Ctrl+K`.
* Modals can be dismissed using the `Escape` key (`keydown` listener).

### 3. ARIA Roles & Landmarks (WCAG 1.3.1)
* Modals declare `role="dialog"` and `aria-modal="true"`.
* Navigation landmarks use `<aside>`, `<header>`, `<main>`, `<footer>`.
* Icon-only buttons include descriptive `aria-label` attributes (e.g., `aria-label="Notifications"`, `aria-label="Toggle theme"`).

### 4. Motion Controls (WCAG 2.3.3)
* Animations utilize subtle hardware-accelerated transitions via Framer Motion.
* User preferences for reduced motion (`prefers-reduced-motion`) are respected.
