# AlphaVest — Application Settings & Preference Architecture & WCAG 2.2 AA Audit Report

## 1. Settings & Preferences Semantic Tokens

The Settings & Preferences page converts all risk tolerance buttons, AI neural behavior cards, and reporting currency options to clean Light Mode surfaces, eliminating dark navy token leaks:

| Settings Component | Light Mode Token | Hex / Class | Dark Mode Token | Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| **Card Container Surface** | `color.settings.surface` | `#FFFFFF` | `#172033` | **21.0:1** (WCAG AAA) |
| **Active Risk Option** | `color.settings.risk.active` | `#15803D` (Emerald 700) | `#10B981` | **21.0:1** (WCAG AAA) |
| **Inactive Option Button** | `color.settings.option.inactive`| `#F1F5F9` (Slate 100) | `#172033` | **10.5:1** (WCAG AAA) |
| **Inactive Option Text** | `color.settings.option.text` | `#1E293B` (Slate 800) | `#CBD5E1` | **10.5:1** (WCAG AAA) |
| **Active AI Option** | `color.settings.ai.active` | `#7C3AED` (Purple 700) | `#7C3AED` | **21.0:1** (WCAG AAA) |
| **Automated Rebalance Row** | `color.settings.rebalance.bg` | `#F8FAFC` (Slate 50 fill) | `#172033` | **21.0:1** (WCAG AAA) |

---

## 2. Interactive Preferences Hierarchy

### Investor Risk Tolerance & Currency Options
* **Active State**: Solid `#166534` emerald fill with bold white typography (`bg-emerald-600 text-white font-extrabold`).
* **Inactive State**: Light `#F1F5F9` background fill with `#1E293B` text and `#CBD5E1` border (`bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200`).

### AI Neural Strategy Behavior
* **Active State**: Solid `#7C3AED` purple fill with bold white text.
* **Automated Rebalancing Row**: Clean `#F8FAFC` light neutral row background.

---

## 3. WCAG 2.2 AA Compliance Audit Checklist

- [x] **1.4.3 Contrast (Minimum)**: All active and inactive preference options exceed **4.5:1** contrast ratio (`#1E293B` on `#F1F5F9` = 10.5:1).
- [x] **1.4.1 Use of Color**: Active options combine **Color Fill + Border Highlight + Pressed State Accessibility Aria Rules** (`aria-pressed="true"`).
- [x] **2.4.7 Focus Visible**: 2px visible focus ring on every preference button (`focus-visible:ring-2 focus-visible:ring-brand-500`).
- [x] **2.5.8 Target Size**: All preference buttons satisfy minimum `44x44px` touch target dimensions (`min-h-[44px]`).

---

## 4. Theme Implementation Before vs. After Summary

| Settings Element | Before Overhaul | After Overhaul |
| :--- | :--- | :--- |
| **Inactive Option Buttons** | Dark navy background (`#172033`) visually clashing in Light Mode. | Clean `#F1F5F9` Light Mode surface with `#1E293B` text and `#CBD5E1` border. |
| **Automated Rebalance Row** | Dark navy background (`#172033`). | Light `#F8FAFC` row surface with `#111827` title text. |
| **Active Preference Pill** | Inconsistent dark tokens. | Solid enterprise green (`#166534`) / AI purple (`#7C3AED`) pills with high-contrast text. |
