# Tech Stack

Plain HTML, CSS and JavaScript. Nothing to install, nothing to build. Open `index.html` in a browser and the app runs.

This keeps the focus on the product and the design, not on tooling. Anyone with a browser and a text editor (or an AI tool) can change it.

---

## Files

```
index.html      Page structure
styles.css      All styles. Design tokens are CSS custom properties at the top
app.js          Dates, week math, rendering and state
requirements/   PRD, style guide and this document
```

Keep it to these three app files unless a feature clearly needs more. If you add a file, link it from `index.html` with a relative path.

---

## HTML

- Semantic elements: `main`, `form`, `button`, `footer`, real `label`s for form fields
- Use the `hidden` attribute to show and hide sections. The JavaScript toggles it

## CSS

- Use the custom properties in `:root` for colour, spacing, radius and font. Add new tokens there rather than hard-coding values
- Layout with flexbox and CSS grid
- Mobile breakpoint at 768px. Below it, each year of the grid wraps into 4 rows of 13 weeks
- No CSS frameworks

## JavaScript

- Vanilla JavaScript, loaded with a plain `<script src="app.js">` tag
- **No ES modules** (`type="module"` or `import`). Browsers block them when the page is opened straight from a file, and that breaks the "just open index.html" rule
- No frameworks, no npm packages, no CDN scripts
- Small, named functions with short comments that explain why
- Write user-facing text with `textContent`, not `innerHTML`

## Data

- The birth date is saved in the browser's `localStorage` under the key `life-in-weeks-birthdate`, as JSON: `{ "month": 6, "day": 23, "year": 1974 }`
- Wrap storage calls in `try`/`catch`. Some browsers block storage in private windows, and the app should still work without it
- No accounts, no server, no cloud storage

---

## Version control: GitHub

- `main` is the starter. Don't commit to it directly
- Make a branch for your feature: `git checkout -b your-group-name`
- Commit small and often, with a message that says what changed
- Share your work with a pull request from your fork

## Hosting (optional)

Any static host works because there's no build step. GitHub Pages is the easiest: repo Settings, Pages, deploy from a branch.
