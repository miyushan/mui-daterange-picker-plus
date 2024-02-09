import { isSameMonth } from "date-fns";
import type { Locale } from "date-fns";
import Grid2 from "@mui/material/Unstable_Grid2";
import Month from "./Month";
import { MARKERS } from "../Constants/markers";
import { NavigationAction } from "../types/utils";
import type { DateRange } from "../types/utils";

type SingleCalenderProps = {
  firstMonth: Date;
  secondMonth: Date;
  handleSetSingleMonth: (date: Date) => void;
  canNavigateCloser: boolean;
  commonProps: {
    dateRange: DateRange;
    minDate: Date;
    maxDate: Date;
    helpers: {
      isInHoverRange: (day: Date) => boolean;
    };
    handlers: {
      handleClickDateNumber: (day: Date) => void;
      handleHoverDateNumber: (day: Date) => void;
      handleClickNavIcon: (marker: symbol, action: NavigationAction) => void;
    };
  };
  locale?: Locale;

  hideOutsideMonthDays?: boolean;
};

export const SingleCalender = ({
  firstMonth,
  secondMonth,
  handleSetSingleMonth,
  commonProps,
  locale,
  hideOutsideMonthDays,
}: SingleCalenderProps) => {
  const canNavigateBack = !isSameMonth(firstMonth, commonProps.minDate);
  const canNavigateForward = !isSameMonth(firstMonth, commonProps.maxDate);

  return (
    <Grid2
      xs={12}
      container
      direction={{
        xs: "column",
        md: "row",
      }}
      justifyContent="center"
    >
      <Grid2 xs="auto" container direction={"column"}>
        <Month
          {...commonProps}
          currentDate={firstMonth}
          otherDate={secondMonth}
          setMonth={handleSetSingleMonth}
          navState={[canNavigateBack, canNavigateForward]}
          marker={MARKERS.SINGLE_MONTH as symbol}
          locale={locale}
          hideOutsideMonthDays={hideOutsideMonthDays}
        />
      </Grid2>
    </Grid2>
  );
};
