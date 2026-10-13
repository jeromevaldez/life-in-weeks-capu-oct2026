# Notes for AI coding agents

Life in Weeks, built in Next.js. This is the `nextjs` branch of a starter for a design class. The people working in it are interaction design students, many of them new to code. Explain what you change in plain language.

The `main` branch has the same app in plain HTML, CSS and JavaScript.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```


## Tech Stack

- **Next.js 15** with Pages Router (not App Router)
- **React 19** with TypeScript
- **Radix Themes** for UI components (Box, Flex, Container, Select, Button, Tooltip, etc.)
- **Tailwind CSS v4** for utility classes
- **Phosphor Icons** for icons

## Architecture

This is a single-page "Life in Weeks" visualization app that displays 4,680 weeks (90 years × 52 weeks) as a grid.

### State Flow

The `useBirthDate` hook (`src/hooks/useBirthDate.ts`) is the central state manager:
- Persists birth date to localStorage
- Handles SSR hydration with `isHydrated` flag to prevent mismatch
- Controls input/display mode via `showInput` derived state

### Grid Rendering

The grid renders 90 years × 52 weeks = 4,680 squares:
- `WeekGrid` → renders 90 `YearRow` components
- `YearRow` → renders 52 `WeekSquare` components (memoized)
- `WeekSquare` → renders individual week with Radix Tooltip (memoized)

### Styling Approach

- Use Radix CSS variables for colors (e.g., `var(--gray-5)`, `var(--indigo-7)`)
- Grid layout uses CSS Grid defined in `src/styles/globals.css`
- Responsive breakpoint at 768px changes grid from 52 to 13 columns

### Key Utilities

- `src/utils/dateUtils.ts` - Date validation, formatting, leap year handling
- `src/utils/weekCalculations.ts` - Week counting from birth date, tooltip formatting

## Project Requirements

Detailed requirements are in the `requirements/` folder:
- `prd.md` - Product requirements
- `tech-stack.md` - Technology decisions
- `style-guide.md` - Radix Themes configuration

## Rules

- Work on a branch, never on `main` or `nextjs`
- When you finish a feature, check it in a browser at desktop width and at phone width (under 768px)
