// Life in Weeks: a 90-year grid with one square for every week of a life.
// Plain JavaScript, no build step. Open index.html in a browser to run it.

const TOTAL_YEARS = 90;
const WEEKS_PER_YEAR = 52;
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'life-in-weeks-birthdate';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ----- Page elements -----

const form = document.getElementById('birth-form');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
const yearSelect = document.getElementById('year');
const cancelButton = document.getElementById('cancel');
const errorText = document.getElementById('error');
const display = document.getElementById('birth-display');
const birthText = document.getElementById('birth-text');
const summary = document.getElementById('summary');
const grid = document.getElementById('grid');
const tooltip = document.getElementById('tooltip');

// ----- State -----

// birthDate looks like { month: 6, day: 23, year: 1974 }, or null before one is entered
let birthDate = loadBirthDate();
let isEditing = false;

function loadBirthDate() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function storeBirthDate(value) {
  try {
    if (value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage can be blocked (private windows). The app still works, it just won't remember.
  }
}

// ----- Dates -----

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function toDate({ month, day, year }) {
  return new Date(year, month - 1, day);
}

function daysInMonth(month, year) {
  // Day 0 of the next month is the last day of this one
  return new Date(year, month, 0).getDate();
}

// Returns an error message, or null if the date is fine
function validateBirthDate({ month, day, year }) {
  if (!month || !day || !year) return 'Please fill in all fields';
  if (day > daysInMonth(month, year)) return 'Invalid date';

  const date = toDate({ month, day, year });
  const today = startOfToday();
  if (date > today) return 'Birth date cannot be in the future';

  const oldestAllowed = startOfToday();
  oldestAllowed.setFullYear(today.getFullYear() - TOTAL_YEARS);
  if (date < oldestAllowed) return 'Birth date exceeds the 90-year grid';

  return null;
}

function formatDate(date, month = 'long') {
  return date.toLocaleDateString('en-US', { month, day: 'numeric', year: 'numeric' });
}

// ----- Week math -----

// The day a given year of life starts, i.e. that year's birthday
function birthdayInYear(birth, yearIndex) {
  const date = new Date(birth);
  date.setFullYear(birth.getFullYear() + yearIndex);
  return date;
}

function weeksLived(birthDate) {
  const birth = toDate(birthDate);
  const today = startOfToday();

  let years = today.getFullYear() - birth.getFullYear();
  if (today < birthdayInYear(birth, years)) years--;

  const weeks = Math.floor((today - birthdayInYear(birth, years)) / MS_PER_WEEK);
  return { years, weeks };
}

// Everything we know about one square in the grid
function weekInfo(birthDate, yearIndex, weekIndex) {
  const birth = toDate(birthDate);
  const yearStart = birthdayInYear(birth, yearIndex);
  const start = new Date(yearStart.getTime() + weekIndex * MS_PER_WEEK);

  // 52 weeks is 364 days, so the last week of each year stretches to the next birthday
  const end = weekIndex === WEEKS_PER_YEAR - 1
    ? new Date(birthdayInYear(birth, yearIndex + 1).getTime() - 1)
    : new Date(start.getTime() + MS_PER_WEEK - 1);

  const today = startOfToday();
  return {
    year: yearIndex + 1,
    week: weekIndex + 1,
    start,
    end,
    isLived: start <= today,
    isCurrent: start <= today && today <= end,
  };
}

// ----- Building the page -----

function fillSelect(select, options) {
  for (const { value, label } of options) {
    select.add(new Option(label, value));
  }
}

function fillDayOptions() {
  const month = Number(monthSelect.value) || 1;
  const year = Number(yearSelect.value) || new Date().getFullYear();
  const picked = daySelect.value;

  daySelect.length = 1; // keep the "Day" placeholder
  const days = Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1);
  fillSelect(daySelect, days.map((d) => ({ value: d, label: d })));

  // Keep the chosen day if it still exists in this month
  if (Number(picked) <= days.length) daySelect.value = picked;
}

function buildForm() {
  fillSelect(monthSelect, MONTH_NAMES.map((name, i) => ({ value: i + 1, label: name })));

  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: TOTAL_YEARS + 1 }, (_, i) => thisYear - i);
  fillSelect(yearSelect, years.map((y) => ({ value: y, label: y })));

  fillDayOptions();
}

// Creates all 4,680 squares once. paintGrid() colours them.
function buildGrid() {
  for (let yearIndex = 0; yearIndex < TOTAL_YEARS; yearIndex++) {
    const row = document.createElement('div');
    row.className = 'year-row';

    const label = document.createElement('span');
    label.className = 'year-label';
    label.textContent = yearIndex + 1;
    row.append(label);

    const weeks = document.createElement('div');
    weeks.className = 'weeks';
    for (let weekIndex = 0; weekIndex < WEEKS_PER_YEAR; weekIndex++) {
      const square = document.createElement('div');
      square.className = 'week';
      square.dataset.year = yearIndex;
      square.dataset.week = weekIndex;
      weeks.append(square);
    }
    row.append(weeks);
    grid.append(row);
  }
}

function paintGrid() {
  grid.classList.toggle('has-date', Boolean(birthDate));
  for (const square of grid.querySelectorAll('.week')) {
    const info = birthDate
      ? weekInfo(birthDate, Number(square.dataset.year), Number(square.dataset.week))
      : null;
    square.classList.toggle('lived', Boolean(info?.isLived));
    square.classList.toggle('current', Boolean(info?.isCurrent));
  }
}

function renderSummary() {
  const { years, weeks } = weeksLived(birthDate);
  const yearsText = document.createElement('strong');
  yearsText.textContent = `${years} ${years === 1 ? 'year' : 'years'}`;
  const weeksText = document.createElement('strong');
  weeksText.textContent = `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  summary.replaceChildren('You have lived ', yearsText, ' and ', weeksText);
}

function render() {
  const showForm = !birthDate || isEditing;
  form.hidden = !showForm;
  cancelButton.hidden = !isEditing;
  display.hidden = showForm;
  summary.hidden = !birthDate;

  if (birthDate) {
    birthText.textContent = formatDate(toDate(birthDate));
    renderSummary();
  }
  paintGrid();
}

function showError(message) {
  errorText.textContent = message || '';
  errorText.hidden = !message;
}

function setFormValues(value) {
  monthSelect.value = value?.month ?? '';
  yearSelect.value = value?.year ?? '';
  fillDayOptions();
  daySelect.value = value?.day ?? '';
}

// ----- Tooltip -----

function showTooltip(square) {
  const info = weekInfo(birthDate, Number(square.dataset.year), Number(square.dataset.week));
  const heading = `Year ${info.year}, Week ${info.week}${info.isCurrent ? ' (Current)' : ''}`;
  tooltip.textContent = `${heading}\n${formatDate(info.start, 'short')} – ${formatDate(info.end, 'short')}`;

  const box = square.getBoundingClientRect();
  tooltip.style.left = `${box.left + box.width / 2}px`;
  tooltip.style.top = `${box.top}px`;
  tooltip.hidden = false;
}

function hideTooltip() {
  tooltip.hidden = true;
}

// ----- Events -----

monthSelect.addEventListener('change', fillDayOptions);
yearSelect.addEventListener('change', fillDayOptions);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = {
    month: Number(monthSelect.value),
    day: Number(daySelect.value),
    year: Number(yearSelect.value),
  };

  const error = validateBirthDate(value);
  showError(error);
  if (error) return;

  birthDate = value;
  isEditing = false;
  storeBirthDate(birthDate);
  render();
});

cancelButton.addEventListener('click', () => {
  isEditing = false;
  showError(null);
  render();
});

document.getElementById('edit').addEventListener('click', () => {
  isEditing = true;
  setFormValues(birthDate);
  render();
});

document.getElementById('reset').addEventListener('click', () => {
  birthDate = null;
  isEditing = false;
  storeBirthDate(null);
  setFormValues(null);
  render();
});

grid.addEventListener('mouseover', (event) => {
  const square = event.target.closest('.week');
  if (square && birthDate) {
    showTooltip(square);
  } else {
    hideTooltip();
  }
});
grid.addEventListener('mouseleave', hideTooltip);
window.addEventListener('scroll', hideTooltip, { passive: true });

// ----- Start -----

buildForm();
buildGrid();
render();
