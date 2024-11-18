import type { SvgIconProps } from "@mui/material";
import type { Locale } from "date-fns";
import type { Dispatch, ElementType, SetStateAction } from "react";
import type { Labels } from '.';

export type Marker = symbol;

export type DefinedRange = {
  startDate: Date;
  endDate: Date;
  label: string;
};

export type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

export type Setter<T> = Dispatch<SetStateAction<T>> | ((value: T) => void);

export enum NavigationAction {
  Previous = -1,
  Next = 1,
}

export type RangeSeparatorIconsProps = {
  xs?: ElementType<SvgIconProps>;
  md?: ElementType<SvgIconProps>;
};

export type PickerProps = {
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  minDays?: number;
  maxDays?: number;
  locale?: Locale;
  labels?: Labels;
  onChange?: (dateRange: DateRange) => void;
  dateRange?: DateRange;
  hideDefaultRanges?: boolean;
  hideOutsideMonthDays?: boolean;
};

export type ModalCustomProps = {
  onSubmit?: (dateRange: DateRange) => void;
  onCloseCallback?: () => void;
  RangeSeparatorIcons?: RangeSeparatorIconsProps;
  hideActionButtons?: boolean;
};
