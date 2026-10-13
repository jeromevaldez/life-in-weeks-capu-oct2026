import { BirthDate, WeekInfo } from '@/types';
import { birthDateToDate } from './dateUtils';

const TOTAL_YEARS = 90;
const WEEKS_PER_YEAR = 52;
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export function calculateWeeksLived(birthDate: BirthDate): {
  years: number;
  weeks: number;
  totalWeeks: number;
} {
  const birth = birthDateToDate(birthDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the most recent birthday anniversary
  let years = today.getFullYear() - birth.getFullYear();
  const thisYearAnniversary = new Date(birth);
  thisYearAnniversary.setFullYear(today.getFullYear());

  // If we haven't reached this year's birthday yet, we're still in the previous year
  if (today < thisYearAnniversary) {
    years--;
  }

  // Get the start of the current anniversary year
  const currentAnniversary = new Date(birth);
  currentAnniversary.setFullYear(birth.getFullYear() + years);

  // Calculate weeks within the current anniversary year
  const diffMs = today.getTime() - currentAnniversary.getTime();
  const weeks = Math.floor(diffMs / MS_PER_WEEK);

  // Total weeks is years * 52 + weeks within current year
  const totalWeeks = years * WEEKS_PER_YEAR + weeks;

  return { years, weeks, totalWeeks };
}

export function getWeekInfo(
  yearIndex: number,
  weekIndex: number,
  birthDate: BirthDate
): WeekInfo {
  const birth = birthDateToDate(birthDate);

  // Get anniversary date for this year (birth date + yearIndex years)
  const anniversaryStart = new Date(birth);
  anniversaryStart.setFullYear(birth.getFullYear() + yearIndex);

  // Add weekIndex weeks from the anniversary
  const startDate = new Date(anniversaryStart.getTime() + weekIndex * MS_PER_WEEK);
  const endDate = new Date(startDate.getTime() + MS_PER_WEEK - 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isLived = startDate <= today;
  const isCurrent = startDate <= today && endDate >= today;

  return {
    weekNumber: weekIndex + 1,
    yearNumber: yearIndex + 1,
    startDate,
    endDate,
    isLived,
    isCurrent,
  };
}

export function formatWeekTooltip(weekInfo: WeekInfo): string {
  const startStr = weekInfo.startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const endStr = weekInfo.endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  let label = `Year ${weekInfo.yearNumber}, Week ${weekInfo.weekNumber}`;
  if (weekInfo.isCurrent) {
    label += ' (Current)';
  }
  label += `\n${startStr} - ${endStr}`;

  return label;
}

export { TOTAL_YEARS, WEEKS_PER_YEAR };
