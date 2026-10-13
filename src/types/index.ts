export interface BirthDate {
  month: number;
  day: number;
  year: number;
}

export interface WeekInfo {
  weekNumber: number;
  yearNumber: number;
  startDate: Date;
  endDate: Date;
  isLived: boolean;
  isCurrent: boolean;
}

export interface DateValidationResult {
  isValid: boolean;
  error?: string;
}
