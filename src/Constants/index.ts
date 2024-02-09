import { addYears, endOfYear, startOfYear } from "date-fns";

export const AVAILABLE_MIN_DATE = startOfYear(addYears(new Date(), -10));
export const AVAILABLE_MAX_DATE = endOfYear(addYears(new Date(), 10));
