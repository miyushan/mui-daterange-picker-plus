import { DateRangePicker } from "./DateRangePicker";
import type { PickerModalProps } from "./types";
import { Dialog, useTheme, Popover, useMediaQuery } from "@mui/material";

export const PickerModal = ({
  modalProps,
  customProps,
  ...dateRangePickerProps
}: PickerModalProps) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobileView) {
    const { open, onClose } = modalProps;
    return (
      <Dialog open={open} onClose={onClose}>
        <DateRangePicker
          {...dateRangePickerProps}
          customProps={customProps}
          footerRequired
        />
      </Dialog>
    );
  }

  return (
    <Popover {...modalProps}>
      <DateRangePicker
        {...dateRangePickerProps}
        customProps={customProps}
        footerRequired
      />
    </Popover>
  );
};
