# AlphaVest — Reusable Component Library

## UI Components Overview

All components are located in `src/components/ui/` and follow atomic design principles.

### 1. `Button`
* **Props**: `variant` (`primary` | `secondary` | `outline` | `ghost` | `danger` | `ai`), `size` (`sm` | `md` | `lg`), `isLoading`, `leftIcon`, `rightIcon`, `fullWidth`.
* **Features**: Framer Motion `whileTap` micro-interaction, glow shadows, spinners during loading.

### 2. `Card` & `MetricCard`
* **Props**: `variant` (`glass` | `solid` | `gradient` | `ai`), `glowing`.
* **MetricCard Props**: `title`, `value`, `change`, `changePercent`, `subtext`, `icon`, `sparkline`.
* **Features**: SVG sparklines, glassmorphism borders, return badges.

### 3. `DataTable`
* **Props**: `data`, `columns`, `searchPlaceholder`, `searchKey`, `pageSize`, `onRowClick`.
* **Features**: Dynamic sorting by column, client-side search filtering, pagination controls, empty state handling.

### 4. `Modal`
* **Props**: `isOpen`, `onClose`, `title`, `description`, `children`, `maxWidth`.
* **Features**: Accessible `role="dialog"`, backdrop blur, `Escape` key trapping, Framer Motion entrance transition.

### 5. `Tabs`
* **Props**: `tabs` (list of id/label/count), `activeTab`, `onChange`.
* **Features**: Animated sliding indicator powered by Framer Motion `layoutId`.

### 6. `ToastContainer`
* **Features**: Stacked bottom-right notifications with auto-dismiss timers and type-based styling (`success`, `info`, `warning`, `error`).

### 7. `Badge` & `ReturnBadge`
* **Features**: Highlighting gain/loss percentages with green/red indicator icons and risk score pills.

### 8. `LoadingSkeleton`, `ErrorState`, `EmptyState`
* **Features**: Pulse placeholder skeletons, retry connection error bounds, and empty state CTA wrappers.
