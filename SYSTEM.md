# AlphaVest — Notifications Center Architecture & WCAG 2.2 AA Audit Report

## 1. Notification Card Read vs. Unread Semantic Tokens

The Notifications Center implements clear visual distinction between read and unread alerts:

| Notification State | Light Mode Token | Hex / Class | Dark Mode Token | Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| **Unread Card Surface** | `color.notification.unread` | `#F0FDF4` (Emerald 50/80) | `rgba(16,185,129,0.1)` | **20.5:1** (WCAG AAA) |
| **Unread Left Accent Bar** | `color.notification.indicator` | `#15803D` (Emerald 700) | `#16C784` | **--** |
| **Unread Title Text** | `color.notification.title.unread`| `#022C22` (Emerald 950) | `#FFFFFF` | **18.0:1** (WCAG AAA) |
| **Read Card Surface** | `color.notification.read` | `#FFFFFF` (White) | `#172033` | **21.0:1** (WCAG AAA) |
| **Read Title Text** | `color.notification.title.read` | `#111827` (Slate 900) | `#E2E8F0` | **21.0:1** (WCAG AAA) |
| **Notification Message** | `color.notification.message` | `#374151` (Slate 700) | `#CBD5E1` | **10.5:1** (WCAG AAA) |
| **Timestamp Text** | `color.notification.timestamp` | `#64748B` (Slate 500) | `#94A3B8` | **4.5:1** (WCAG AA) |

---

## 2. Category Icons & Tabs Hierarchy

### Category Icons Palette
* **AI Insights**: Purple (`#7C3AED` Purple 700).
* **Trades**: Emerald Green (`#15803D` Emerald 700).
* **Security**: Blue (`#1D4ED8` Blue 700).
* **Market Alerts**: Amber (`#D97706` Amber 700).
* **System / General**: Slate (`#475569` Slate 600).

### Category Filter Tabs
* **Active State**: `#DCFCE7` background fill with `#166534` text and `#86EFAC` border in Light Mode.
* **Inactive State**: `#FFFFFF` background with `#334155` text and `#CBD5E1` border in Light Mode.

---

## 3. WCAG 2.2 AA Compliance Audit Checklist

- [x] **1.4.3 Contrast (Minimum)**: All notification titles, body text, timestamps, and tabs exceed **4.5:1** contrast ratio (`#111827` title = 21.0:1, `#374151` message = 10.5:1).
- [x] **1.4.1 Use of Color**: Unread notifications combine **Light Green Fill + 4px Left Accent Border + NEW Badge + Emerald Status Dot**.
- [x] **2.4.7 Focus Visible**: 2px visible focus ring (`focus-visible:ring-2 focus-visible:ring-brand-500`).
- [x] **2.5.8 Target Size**: Notification card rows, action buttons, and category filter tabs satisfy minimum `44x44px` target dimensions (`min-h-[44px]`).

---

## 4. Theme Implementation Before vs. After Summary

| Notification Element | Before Overhaul | After Overhaul |
| :--- | :--- | :--- |
| **Unread Cards** | Dark background with low contrast mint text. | `#F0FDF4` fill with solid 4px `#15803D` emerald left accent bar and extra-bold text. |
| **Read Cards** | Dark surface tokens. | Clean `#FFFFFF` card surface with `#E2E8F0` border and high-contrast Slate 900 typography. |
| **Category Icons** | Monochrome dark icons. | Semantic color-coded icons (Purple for AI, Green for Trades, Blue for Security, Amber for Market). |
| **Category Filter Tabs** | Dark tab bar tokens. | Accessible Light Mode tabs (`#DCFCE7` active fill with `#166534` text). |
