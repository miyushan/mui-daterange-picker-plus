import { DateRangePicker } from "./DateRangePicker";
import type { PickerBaseProps } from "./types";

export const PickerBase = (props: PickerBaseProps) => {
  return <DateRangePicker {...props} />;
};
