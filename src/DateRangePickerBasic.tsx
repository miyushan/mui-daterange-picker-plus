import { DateRangePicker } from ".";
import type { DateRangeProps } from ".";

type BasicPickerPropsWithFooter = DateRangeProps;

export const BasicDateRangePicker = (props: BasicPickerPropsWithFooter) => {
  return <DateRangePicker {...props} />;
};
