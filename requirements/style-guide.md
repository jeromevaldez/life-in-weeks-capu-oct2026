# Style Guide

The visual design system for Life in Weeks. The colours and scales come from Radix Themes (indigo accent, pure gray), written as plain CSS custom properties in `styles.css`. AI agents should use these tokens when building UI.

---

## Colour

### Gray

| Token | Hex | Use |
|---|---|---|
| `--gray-1` | `#fcfcfc` | Page background |
| `--gray-2` | `#f9f9f9` | Subtle panels |
| `--gray-5` | `#e0e0e0` | Empty weeks |
| `--gray-7` | `#cecece` | Borders on inputs |
| `--gray-11` | `#646464` | Secondary text, year labels |
| `--gray-12` | `#202020` | Primary text, tooltip background |

### Accent: indigo

| Token | Hex | Use |
|---|---|---|
| `--indigo-3` | `#edf2fe` | Soft button background |
| `--indigo-4` | `#e1e9ff` | Soft button hover |
| `--indigo-7` | `#abbdf9` | Lived weeks, outline button border |
| `--indigo-9` | `#3e63dd` | Solid buttons, the current week, focus rings |
| `--indigo-10` | `#3358d4` | Solid button hover |
| `--indigo-11` | `#3a5bc7` | Accent text and links |

### Status

| Token | Hex | Use |
|---|---|---|
| `--red-11` | `#ce2c31` | Error messages |

### Grid

| Token | Default | Meaning |
|---|---|---|
| `--week-empty` | `--gray-5` | A week not lived yet (or no birth date entered) |
| `--week-lived` | `--indigo-7` | A week already lived |
| `--week-current` | `--indigo-9` | This week |

To change the look, start with these tokens. Radix has other 12-step scales (tomato, crimson, plum, teal, grass, amber and more) at https://www.radix-ui.com/colors if you want to swap the accent.

---

## Typography

System font stack, so it loads instantly and looks native on every device:

```css
--font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', system-ui, sans-serif;
```

| Size | Use |
|---|---|
| 35px, bold | Page title |
| 18px | Summary line |
| 16px | Body text |
| 14px | Buttons, inputs, footer, errors |
| 12px | Tooltip |
| 10px | Year labels (9px on mobile) |

Weights: 400 for body, 500 for buttons, 700 for the title and emphasis.

---

## Spacing

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |

Squares in the grid sit 2px apart. Year rows sit `--space-1` apart.

---

## Shape

- `--radius: 6px` for buttons and inputs
- 2px radius on week squares
- 4px radius on the tooltip

---

## Components

### Buttons

All buttons are 32px tall with 14px medium text.

- **Solid** (`.button`): indigo-9 background, white text. The main action, e.g. Submit
- **Soft** (`.button-soft`): indigo-3 background, indigo-11 text. Secondary actions, e.g. Cancel
- **Outline** (`.button-outline`): transparent, indigo-7 border, indigo-11 text. Quiet actions, e.g. Edit and Reset

### Selects

32px tall, white background, gray-7 border, 6px radius. Focus shows a 2px indigo-9 ring.

### Tooltip

Dark gray-12 box with white 12px text, centred above the hovered square. Two lines: "Year X, Week Y" (plus "(Current)" for this week) and the week's date range.

---

## Dark mode

Not built yet. If you add it, redefine the tokens inside `@media (prefers-color-scheme: dark)` rather than changing individual rules.

---

## Project-specific overrides

*Add design decisions here as you refine the look and feel.*
