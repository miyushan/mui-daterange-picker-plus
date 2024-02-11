import type { Marker } from "../types/utils";

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol("firstMonth"),
  SECOND_MONTH: Symbol("secondMonth"),
  SINGLE_MONTH: Symbol("singleMonth"),
};
