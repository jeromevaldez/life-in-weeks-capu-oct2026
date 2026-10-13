# Life in Weeks — Product Requirements Document

## Overview

A single-page web application that visualizes a user's life as a grid of weeks. Inspired by Tim Urban's [Life in Weeks](https://waitbutwhy.com/2014/05/life-weeks.html) concept, the app allows users to enter their birth date and see a visual representation of their ~4,680 weeks (90 years), with lived weeks filled in and future weeks shown as empty.

This initial version is a read-only visualization. The architecture should support adding interactivity (e.g., marking events, adding notes) in future iterations.

---

## Page Structure

### Header
- **Title:** "Life in Weeks"

### Birth Date Input (Initial State)
- Three dropdown fields in sequence: **Month**, **Day**, **Year**
- Each dropdown should support typing/autocomplete so users can type values (e.g., "June") rather than only selecting from the list
- Basic labels or placeholder text to indicate which field is which
- A **Submit** button to confirm the date

### Birth Date Display (After Submission)
- Hide the date input fields
- Display the submitted birth date as text
- Show an **Edit** button next to the date to reveal the input fields again
- Show a **Reset** button to clear the birth date and return to the initial empty state

### Summary Row
Displayed above the grid after a birth date is submitted:
- "You have lived X years and Y weeks"
- "You have approximately Z weeks remaining"

### The Grid
- **90 rows** (representing years 0–90)
- **52 columns per row** (representing weeks 1–52 of each year)
- **Row labels** on the left side showing the year of life (0, 1, 2, ... 90)
- **No column labels** at the top — keep it clean

### Footer
- Small attribution link: "Inspired by [Wait But Why](https://waitbutwhy.com/2014/05/life-weeks.html)"

---

## Visual Design

### Grid Squares
- **Lived weeks:** Light gray fill
- **Unlived weeks:** White fill
- **All squares:** Light gray border
- **Shape:** Slight rounded corners (subtle, given the small size)
- **Size:** Small and compact with decent padding between squares
- **Desktop constraint:** All 52 squares in a row must fit without horizontal scrolling at standard desktop resolution

### Tooltip (on Hover)
When a user hovers over any square, display a tooltip showing:
1. **Date:** The start date of that week (e.g., "June 23, 1974")
2. **Age:** Formatted as "X years and Y weeks" (e.g., "1 year and 24 weeks")

---

## Mobile Behavior

On mobile devices where 52 squares cannot fit in a single row:
- Each year **wraps into 4 rows of 13 squares** (52 ÷ 4 = 13)
- Years remain visually grouped together

---

## Data Persistence

- **Local storage:** Save the user's birth date in the browser's local storage so they don't have to re-enter it on subsequent visits
- **Reset functionality:** Allow users to delete their stored birth date and return to the fresh empty-grid state

---

## Error Handling

Display clear, friendly error messages for:
- **Future dates:** Birth date cannot be in the future
- **Dates over 90 years ago:** Birth date exceeds the 90-year grid
- **Invalid dates:** Impossible dates like February 30

---

## Initial State (Before Birth Date Entry)

- Show an **empty grid** (all 4,680 white squares with light gray borders)
- Show the date input fields and Submit button
- No summary row displayed until a birth date is submitted

---

## Week Calculation Logic

- The **first square** (row 0, column 1) corresponds to the week of the user's birth
- Each subsequent square represents the next week of life
- The **first square of each row** represents the start of that year of life (e.g., row 1, column 1 = the user's first birthday week)
- Weeks are calculated from the birth date, not calendar weeks

---

## Out of Scope (Future Iterations)

The following features are intentionally excluded from this version but the architecture should accommodate them later:
- Clicking on squares to add notes or events
- Marking significant life milestones
- Sharing or exporting the grid
- User accounts or cloud storage

---

## Tech Stack

To be defined in a separate document.
