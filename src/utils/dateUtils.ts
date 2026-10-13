import { BirthDate, DateValidationResult } from '@/types';

const MONTHS_WITH_31_DAYS = [1, 3, 5, 7, 8, 10, 12];
const MONTHS_WITH_30_DAYS = [4, 6, 9, 11];

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(month: number, year: number): number {
  if (MONTHS_WITH_31_DAYS.includes(month)) return 31;
  if (MONTHS_WITH_30_DAYS.includes(month)) return 30;
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return 0;
}

export function isValidDate(month: number, day: number, year: number): boolean {
  if (month < 1 || month > 12) return false;
  if (day < 1) return false;
  const daysInMonth = getDaysInMonth(month, year);
  return day <= daysInMonth;
}

export function validateBirthDate(birthDate: BirthDate): DateValidationResult {
  const { month, day, year } = birthDate;

  // Check if date is valid (e.g., Feb 30 is invalid)
  if (!isValidDate(month, day, year)) {
    return { isValid: false, error: 'Invalid date' };
  }

  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if date is in the future
  if (date > today) {
    return { isValid: false, error: 'Birth date cannot be in the future' };
  }

  // Check if date is more than 90 years ago
  const ninetyYearsAgo = new Date();
  ninetyYearsAgo.setFullYear(ninetyYearsAgo.getFullYear() - 90);
  ninetyYearsAgo.setHours(0, 0, 0, 0);

  if (date < ninetyYearsAgo) {
    return { isValid: false, error: 'Birth date exceeds the 90-year grid' };
  }

  return { isValid: true };
}

export function birthDateToDate(birthDate: BirthDate): Date {
  return new Date(birthDate.year, birthDate.month - 1, birthDate.day);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatBirthDate(birthDate: BirthDate): string {
  const date = birthDateToDate(birthDate);
  return formatDate(date);
}

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
