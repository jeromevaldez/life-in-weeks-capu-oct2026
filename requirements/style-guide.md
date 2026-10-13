# Style Guide

This document defines the visual design system for the project, based on Radix Themes defaults. AI agents should use these specifications when building UI components.

---

## Theme Configuration

The Radix `<Theme>` component is configured with these defaults:

```tsx
<Theme
  accentColor="indigo"
  grayColor="gray"
  panelBackground="solid"
  radius="medium"
  scaling="100%"
>
```

| Property | Value | Description |
|----------|-------|-------------|
| `accentColor` | `indigo` | Primary interactive color |
| `grayColor` | `gray` | Neutral color for text, borders, backgrounds |
| `panelBackground` | `solid` | Solid backgrounds for panels/cards |
| `radius` | `medium` | Border radius scale |
| `scaling` | `100%` | UI density multiplier |

---

## Color System

### Accent Color: Indigo

The accent color is used for interactive elements like buttons, links, and focus states.

Radix provides a 12-step scale for each color. Common usage:
- **Step 9** — Solid backgrounds (buttons)
- **Step 11** — Text on light backgrounds
- **Step 3–5** — Subtle backgrounds and hover states

### Gray Color: Gray (Pure)

Used for text, borders, and neutral backgrounds.

| Use Case | Token |
|----------|-------|
| Primary text | `gray-12` |
| Secondary text | `gray-11` |
| Borders | `gray-6` |
| Subtle backgrounds | `gray-2`, `gray-3` |
| Disabled states | `gray-8` |

### Available Accent Colors

If you want to change the accent color, these options are available:

| Warm | Cool | Neutral |
|------|------|---------|
| Tomato | Blue | Gray |
| Red | Cyan | Gold |
| Ruby | Teal | Bronze |
| Crimson | Jade | Brown |
| Pink | Green | |
| Plum | Grass | |
| Purple | Mint | |
| Violet | Lime | |
| Iris | Sky | |
| Indigo | | |
| Orange | | |
| Amber | | |
| Yellow | | |

### Available Gray Colors

| Gray | Description |
|------|-------------|
| `gray` | Pure gray (default) |
| `mauve` | Slight purple tint |
| `slate` | Slight blue tint |
| `sage` | Slight green tint |
| `olive` | Slight yellow-green tint |
| `sand` | Slight yellow tint |

---

## Typography

### Font Family

Radix Themes uses a system font stack by default:

```css
--default-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Open Sans', system-ui, sans-serif;

--code-font-family: 'Menlo', 'Consolas', 'Bitstream Vera Sans Mono', monospace;
```

This means the app uses each user's native system font, ensuring optimal readability and fast loading.

### Font Sizes (9-step scale)

| Size | Value | Common Use |
|------|-------|------------|
| 1 | 12px | Small labels, captions |
| 2 | 14px | Secondary text, metadata |
| 3 | 16px | Body text (default) |
| 4 | 18px | Large body text |
| 5 | 20px | Small headings |
| 6 | 24px | Section headings |
| 7 | 28px | Page headings |
| 8 | 35px | Display headings |
| 9 | 60px | Hero headings |

### Font Weights

| Token | Value | Use |
|-------|-------|-----|
| `light` | 300 | De-emphasized text |
| `regular` | 400 | Body text (default) |
| `medium` | 500 | Slightly emphasized |
| `bold` | 700 | Headings, strong emphasis |

### Typography CSS Variables

To customize fonts, override these in your CSS:

```css
.radix-themes {
  --default-font-family: /* your custom font */;
  --heading-font-family: /* your heading font */;
  --code-font-family: /* your code font */;
}
```

---

## Spacing

Radix Themes uses a 9-step spacing scale:

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Compact elements |
| `--space-3` | 12px | Default gap |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 24px | Section spacing |
| `--space-6` | 32px | Large gaps |
| `--space-7` | 40px | Major sections |
| `--space-8` | 48px | Page sections |
| `--space-9` | 64px | Hero spacing |

Use Radix layout components (`Flex`, `Box`, `Grid`) with `gap`, `p`, and `m` props to apply spacing consistently.

---

## Border Radius

| Value | Description | Use |
|-------|-------------|-----|
| `none` | 0px | Sharp corners |
| `small` | 4px | Subtle rounding |
| `medium` | 8px | Default (balanced) |
| `large` | 12px | Softer, friendly |
| `full` | 9999px | Pills, circles |

The global `radius` setting affects all components. Individual components can override with their own `radius` prop.

---

## Component Styling Notes

### Buttons
- Use the accent color by default
- Variants: `solid`, `soft`, `outline`, `ghost`
- Sizes: `1` (small), `2` (default), `3` (large)

### Inputs
- Use `gray` color for borders
- Focus state uses accent color
- Consistent height with buttons when using same size

### Cards/Panels
- Use `panelBackground="solid"` for opaque backgrounds
- Apply `radius` for rounded corners
- Use subtle gray background (`gray-2`) for visual separation

---

## Dark Mode

Radix Themes supports dark mode via the `appearance` prop:

```tsx
<Theme appearance="dark">
```

Options:
- `light` — Light mode only
- `dark` — Dark mode only
- `inherit` — Follow system preference (default)

All color tokens automatically adjust for dark mode.

---

## Customization Example

To change the theme for a specific project, update the `<Theme>` component:

```tsx
<Theme
  accentColor="cyan"
  grayColor="slate"
  radius="large"
  scaling="105%"
>
  <MyApp />
</Theme>
```

---

## Project-Specific Overrides

*Add any project-specific design decisions below as you refine the look and feel.*

<!-- Example:
### Life in Weeks Grid
- Lived weeks: `gray-6` fill
- Unlived weeks: white fill
- Borders: `gray-4`
- Hover state: `gray-8` fill
-->
