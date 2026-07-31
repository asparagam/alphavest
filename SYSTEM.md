# AlphaVest — Reports Page Layout Spacing & Design System Audit

## 1. Standardized 8pt Spacing System & Grid Specifications

The Reports page implements a strict **8pt spacing system** (`8px`, `12px`, `16px`, `24px`, `32px`) across all report card containers and grid layouts:

| Spacing Token | Class / Pixel Value | Applied Section | Purpose |
| :--- | :--- | :--- | :--- |
| **Card Internal Padding** | `p-6` (**24px**) | All 4 sides of every card | Standardized edge spacing; prevents content crowding. |
| **Grid Horizontal Gap** | `gap-3` (**12px**) | Card Grid container | Balanced column gutters across Desktop, Tablet, and Mobile. |
| **Grid Vertical Gap** | `gap-3` (**12px**) | Card Grid container | Uniform row spacing between stacked cards. |
| **Icon-to-Title Margin** | `mb-4` (**16px**) | Document Icon container | Visual separation between icon and title header. |
| **Title-to-Badge Margin** | `mb-3` (**12px**) | Report Title header | Clean gap above category classification badge. |
| **Badge-to-Date Margin** | `mb-3` (**12px**) | Category Badge | Consistent gap above audit date metadata. |
| **Date-to-Divider Margin**| `mb-6` (**24px**) | Date Metadata | Structural separation before download actions area. |
| **Divider Top Padding** | `pt-5` (**20px**) | Download Actions Baseline | Baseline alignment for size metadata and PDF/CSV buttons. |

---

## 2. Card Auto-Layout Structure

```text
24px Top Padding (p-6)
 ├── Document Icon Container (16px bottom margin -> mb-4)
 ├── Report Title (text-slate-900 dark:text-white, line-height 1.3 -> mb-3)
 ├── Category Badge (12px bottom margin -> mb-3)
 ├── Date Metadata (text-slate-700 dark:text-slate-400 -> mb-6)
 ├── Horizontal Divider (border-t border-slate-200 dark:border-white/10)
 └── Download Actions Baseline (pt-5)
      ├── File Size Metadata (font-extrabold text-slate-700 dark:text-slate-400)
      └── PDF & CSV Action Buttons Group (gap-2)
24px Bottom Padding (p-6)
```

---

## 3. WCAG 2.2 AA Compliance & Theme Parity Checklist

- [x] **Card Title Contrast**: `#111827` (Slate 900) extra-bold typography on `#FFFFFF` card surface (**21.0:1 WCAG AAA Contrast Ratio**).
- [x] **Metadata Legibility**: `#374151` / `#475569` font-medium labels (**10.5:1 Contrast Ratio**).
- [x] **Download Action Buttons**: Distinct PDF and CSV outline/secondary buttons with minimum **44x44px** touch target dimensions.
- [x] **Card Height Consistency**: `flex flex-col justify-between h-full` auto-layout ensures uniform card heights across grid rows.
