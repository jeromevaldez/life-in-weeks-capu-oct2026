# Notes for AI coding agents

Life in Weeks is a single-page web app. You enter a birth date and it shows a life as 90 rows of 52 squares, one square per week, with lived weeks filled in.

This repo is a starter for a design class. The people working in it are interaction design students, many of them new to code. Explain what you change in plain language, and keep the code easy to read.

## Run it

No build, no install. Open `index.html` in a browser. Reload the page to see changes.

## Files

- `index.html`: page structure
- `styles.css`: all styles. Colour, spacing, radius and font tokens are CSS custom properties at the top
- `app.js`: dates, week math, rendering and state, in that order
- `requirements/prd.md`: the original product requirements for version 1
- `requirements/style-guide.md`: colours, type, spacing and components
- `requirements/tech-stack.md`: the rules for how the code is written

The PRD describes the first version. The code has moved on a little since (indigo squares instead of gray, a different tooltip), so treat the code as the truth for how the app behaves today and the PRD as the intent.

## Rules

- Keep it plain HTML, CSS and JavaScript that runs by opening `index.html`. No JavaScript frameworks, no npm, no build tools
- The starter uses no CSS framework. If a student wants one, Pico CSS (https://picocss.com) loads with a single `<link>` tag. That's fine to add
- No ES modules. `type="module"` breaks when the page is opened from a file
- Use the tokens in `styles.css`. Add a new token rather than hard-coding a colour or size
- Write user-facing text with `textContent`, not `innerHTML`
- The saved birth date lives in `localStorage` under `life-in-weeks-birthdate`. If you change its shape, still read the old shape
- Work on a branch, never on `main`
- When you finish a feature, check it in a browser at desktop width and at phone width (under 768px)
