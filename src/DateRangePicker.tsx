import { Sections } from "./components/Sections";
import { useDateRangePicker } from "./hooks/useDateRangePicker";
import type { PickerAvailableProps } from "./types";

type BasicPickerPropsWithFooter = PickerAvailableProps & {
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
