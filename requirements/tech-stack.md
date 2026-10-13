# Tech Stack Specification

This document defines the technology stack for a boilerplate project used to build UX prototypes. AI agents should use this specification to set up the project structure, install dependencies, and configure tooling.

---

## Overview

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js | 22 LTS (latest patched) |
| Framework | Next.js (Pages Router) | Latest stable |
| Language | TypeScript | Latest stable |
| Styling | Tailwind CSS | v4.x |
| UI Components | Radix Themes | Latest stable |
| Icons | Phosphor Icons | Latest stable |
| Package Manager | npm | (bundled with Node.js) |
| Linting | ESLint | Latest stable |
| Formatting | Prettier | Latest stable |
| Version Control | GitHub | — |
| Deployment | Vercel | Auto-deploy on push to main |
| Database | None | — |

---

## Security Requirements

All dependencies must use patched versions that address known vulnerabilities. As of January 2026, be aware of:

- **Node.js 22 LTS** — Use the latest patched version (January 2026 security release or later)
- **React** — If using React 19.x, ensure version 19.0.4+, 19.1.5+, or 19.2.3+ to address CVE-2025-55182 (React2Shell)
- **Next.js** — Use latest stable version with security patches applied
- **Tailwind CSS** — Use v4.x to avoid the glob dependency vulnerability in v3.x

Run `npm audit` after installation to verify no known vulnerabilities exist.

---

## Project Structure

```
project-root/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Next.js pages (each file becomes a route)
│   │   ├── _app.tsx      # App wrapper (global providers, styles)
│   │   ├── _document.tsx # Custom document (HTML structure)
│   │   └── index.tsx     # Home page (/)
│   └── styles/           # Global styles
│       └── globals.css   # Tailwind imports and global CSS
├── public/               # Static assets (images, fonts, favicon)
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

---

## Framework: Next.js with Pages Router

Use the **Pages Router** (not App Router). This provides:
- Simpler mental model for prototyping
- Each file in `src/pages/` automatically becomes a route
- No React Server Components complexity
- Mature ecosystem with extensive documentation

### Key Configuration

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

---

## Styling: Tailwind CSS v4

Tailwind CSS v4 is configured for utility-first styling.

### Setup

Tailwind v4 uses a simplified configuration. Import Tailwind in the global stylesheet:

```css
/* src/styles/globals.css */
@import "tailwindcss";
```

---

## UI Components: Radix Themes

Radix Themes provides pre-styled, accessible components that work out of the box.

### Installation

```bash
npm install @radix-ui/themes
```

### Setup

Wrap the application with the Radix Theme provider in `_app.tsx`:

```tsx
// src/pages/_app.tsx
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}
```

---

## Icons: Phosphor Icons

Phosphor Icons provides a flexible icon library for React.

### Installation

```bash
npm install @phosphor-icons/react
```

### Usage

```tsx
import { Heart, MagnifyingGlass } from '@phosphor-icons/react';

function Example() {
  return (
    <div>
      <Heart size={32} color="#ff0000" />
      <MagnifyingGlass size={24} weight="bold" />
    </div>
  );
}
```

---

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

The `@/*` path alias allows imports like `import { Button } from '@/components/Button'`.

---

## Linting: ESLint

Use Next.js's built-in ESLint configuration with TypeScript support.

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ]
}
```

---

## Formatting: Prettier

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

Add a `.prettierignore` file:

```
node_modules
.next
out
public
```

---

## Package Scripts

```json
// package.json (scripts section)
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write ."
  }
}
```

---

## Version Control: GitHub

- Initialize with `git init`
- Use a `.gitignore` appropriate for Next.js projects
- Push to a GitHub repository

### .gitignore

```
# Dependencies
node_modules/

# Next.js
.next/
out/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Debug
npm-debug.log*
```

---

## Deployment: Vercel

The project is deployed to Vercel with automatic deployments:

1. Connect the GitHub repository to Vercel
2. Vercel auto-detects Next.js and configures the build
3. Every push to the `main` branch triggers a production deployment
4. Pull requests get preview deployments automatically

### Build Settings (auto-detected)

- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

---

## Quick Start for AI Agents

To set up this boilerplate from scratch:

```bash
# 1. Create the Next.js project with TypeScript
npx create-next-app@latest project-name --typescript --eslint --src-dir --no-app --import-alias "@/*"

# 2. Navigate to the project
cd project-name

# 3. Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/postcss postcss

# 4. Install Radix Themes
npm install @radix-ui/themes

# 5. Install Phosphor Icons
npm install @phosphor-icons/react

# 6. Install Prettier
npm install --save-dev prettier

# 7. Run security audit
npm audit
```

After installation, configure the files as specified in this document.

---

## Notes

- This boilerplate is intended for **UX prototypes** — no database or backend API is included
- Keep dependencies minimal; add packages only as needed for specific prototypes
- When duplicating this boilerplate for a new project, run `npm update` to get the latest patched versions
