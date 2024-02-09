import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  isSameDay,
  isWithinInterval,
  isSameMonth,
  addMonths,
  parseISO,
  isValid,
  min,
  max,
} from "date-fns";
import type { Locale } from "date-fns";
import type { DateRange } from "../types/utils";

/**
 * ? Returns an array of chunks of the given size by splitting the input array
 * @param array input array
 * @param size chunk size
 * @returns
 */
export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (_v, i) =>
    array.slice(i * size, i * size + size)
  );

/**
 * ? Returns an array of days for the specified month
 * @param date date to get month
 * @param locale locale to use
 * @returns
 */
export const getDaysInMonth = (date: Date, locale?: Locale) => {
  const startWeek = startOfWeek(startOfMonth(date), { locale });
  const endWeek = endOfWeek(endOfMonth(date), { locale });
  const days = [];
  for (let curr = startWeek; isBefore(curr, endWeek); ) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

/**
 * ? Checks if a given day is the start of the date range
 * @param date date to get month
 * @param locale locale to use
 * @returns
 */
export const isStartOfRange = ({ startDate }: DateRange, day: Date) =>
  (startDate && isSameDay(day, startDate)) as boolean;

/**
 * ? Checks if a given day is the end of the date range
 * @param date date to get month
 * @param locale locale to use
 * @returns
 */
export const isEndOfRange = ({ endDate }: DateRange, day: Date) =>
  (endDate && isSameDay(day, endDate)) as boolean;

/**
 * ? Checks if a given day is in the date range
 * @param date date to get month
 * @param locale locale to use
 * @returns
 */
export const inDateRange = ({ startDate, endDate }: DateRange, day: Date) =>
  (startDate &&
    endDate &&
    (isWithinInterval(day, { start: startDate, end: endDate }) ||
      isSameDay(day, startDate) ||
      isSameDay(day, endDate))) as boolean;

/**
 * ? Checks if start and end date are the same day
 * @param date date to get month
 * @param locale locale to use
 * @returns
 */
export const isRangeSameDay = ({ startDate, endDate }: DateRange) => {
  if (startDate && endDate) {
    return isSameDay(startDate, endDate);
  }
  return false;
};

type Falsy = false | null | undefined | 0 | "";

/**
 * ? Parse a date string or return undefined
 * @param date date to get month
 * @param locale locale to use
 * @returns
 */
export const parseOptionalDate = (
  date: Date | string | Falsy,
  defaultValue: Date
) => {
  if (date) {
    const parsed = date instanceof Date ? date : parseISO(date);
    if (isValid(parsed)) return parsed;
  }
  return defaultValue;
};

/**
 * ? Get the validated firstMonth and secondMonth based on minDate, maxDate and given range
 * @param date date to get month
 * @param locale locale to use
 * @returns [firstMonth, secondMonth]
 */
export const getValidatedMonths = (
  range: DateRange,
  minDate: Date,
  maxDate: Date
) => {
  const { startDate, endDate } = range;
  if (startDate && endDate) {
    const newStart = max([startDate, minDate]);
    const newEnd = min([endDate, maxDate]);

    return [
      newStart,
      isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd,
    ];
  }
  return [startDate, endDate];
};
