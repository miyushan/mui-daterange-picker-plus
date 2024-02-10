import { isSameMonth } from "date-fns";
import type { Locale } from "date-fns";
import Divider from "@mui/material/Divider";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Month } from "./Month";
import { MARKERS } from "../Constants/markers";
import { NavigationAction } from "../types/utils";
import type { DateRange } from "../types/utils";

type DuelCalenderProps = {
  firstMonth: Date;
  secondMonth: Date;
  handleSetFirstMonth: (date: Date) => void;
  handleSetSecondMonth: (date: Date) => void;
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

export const DuelCalender = ({
  firstMonth,
  secondMonth,
  handleSetFirstMonth,
  handleSetSecondMonth,
  canNavigateCloser,
  commonProps,
  locale,
  hideOutsideMonthDays,
}: DuelCalenderProps) => {
  const canNavigateBack = !isSameMonth(firstMonth, commonProps.minDate);
  const canNavigateForward = !isSameMonth(secondMonth, commonProps.maxDate);

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
          setMonth={handleSetFirstMonth}
          navState={[canNavigateBack, canNavigateCloser]}
          marker={MARKERS.FIRST_MONTH as symbol}
          locale={locale}
          hideOutsideMonthDays={hideOutsideMonthDays}
        />
      </Grid2>

      <Grid2 xs="auto">
        <Divider orientation="vertical" />
      </Grid2>

      <Grid2 xs="auto" container direction={"column"}>
        <Month
          {...commonProps}
          currentDate={secondMonth}
          otherDate={firstMonth}
          setMonth={handleSetSecondMonth}
          navState={[canNavigateCloser, canNavigateForward]}
          marker={MARKERS.SECOND_MONTH as symbol}
          locale={locale}
          hideOutsideMonthDays={hideOutsideMonthDays}
        />
      </Grid2>
    </Grid2>
  );
};
