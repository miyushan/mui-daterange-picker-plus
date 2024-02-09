import Sections from "./components/Sections";
import { useDateRangePicker } from "./hooks/useDateRangePicker";
import type { PickerProps } from "./types";

type BasicPickerPropsWithFooter = PickerProps & {
  footerRequired?: boolean;
};

export const DateRangePicker = (props: BasicPickerPropsWithFooter) => {
  const { customProps, ...dateRangePickerProps } = props;
  const onSubmit = customProps?.onSubmit;

  const { ...computedProps } = useDateRangePicker({
    ...dateRangePickerProps,
    onSubmit,
  });
  return (
    <Sections {...dateRangePickerProps} {...computedProps} {...customProps} />
  );
};
