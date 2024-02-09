import React from "react";
import {
  getDate,
  isSameMonth,
  isToday,
  format,
  isWithinInterval,
} from "date-fns";
import type { Locale, Day as DayjsDay } from "date-fns";
import { Typography, useTheme, alpha } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  chunks,
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
} from "../utils";
import MonthHeader from "./Month.Header";
import Day from "./Day";
import { NavigationAction } from "../types/utils";
import type { DateRange } from "../types/utils";

type MonthProps = {
  currentDate: Date;
  otherDate: Date;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setMonth: (date: Date) => void;
  helpers: {
    isInHoverRange: (day: Date) => boolean;
  };
  handlers: {
    handleClickDateNumber: (day: Date) => void;
    handleHoverDateNumber: (day: Date) => void;
    handleClickNavIcon: (marker: symbol, action: NavigationAction) => void;
  };
  locale?: Locale;

  hideOutsideMonthDays?: boolean;
};

const Month: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
  const theme = useTheme();
  const {
    helpers,
    handlers,
    currentDate,
    otherDate,
    dateRange,
    marker,
    setMonth,
    minDate,
    maxDate,
    locale,
    hideOutsideMonthDays,
  } = props;

  const weekStartsOn = locale?.options?.weekStartsOn || 0;
  const WEEK_DAYS = Array.from({ length: 7 }, (_, index) =>
    typeof locale !== "undefined"
      ? locale.localize?.day(((index + weekStartsOn) % 7) as DayjsDay, {
          width: "short",
          context: "standalone",
        })
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]
  );
  const [back, forward] = props.navState;
  return (
    <>
      <Grid2
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: "55px",
          backgroundColor: alpha(theme.palette.grey[400], 0.1),
        }}
      >
        <MonthHeader
          minDate={minDate}
          maxDate={maxDate}
          marker={marker}
          currentDate={currentDate}
          otherDate={otherDate}
          setDate={setMonth}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handlers.handleClickNavIcon(marker, NavigationAction.Previous)
          }
          onClickNext={() =>
            handlers.handleClickNavIcon(marker, NavigationAction.Next)
          }
          locale={locale}
        />
      </Grid2>

      <Grid2
        container
        justifyContent="center"
        sx={{
          margin: "16px 24px 0 24px",
        }}
      >
        {WEEK_DAYS.map((day, index) => (
          <Grid2 key={index} container width="36px" justifyContent={"center"}>
            <Typography
              color="textSecondary"
              key={index}
              sx={{
                fontSize: "12px",
              }}
            >
              {day}
            </Typography>
          </Grid2>
        ))}
      </Grid2>

      <Grid2
        container
        direction="column"
        sx={{
          margin: "24px",
        }}
      >
        {chunks(getDaysInMonth(currentDate, locale), 7).map((week, idx) => (
          <Grid2 key={idx} container direction="row" justifyContent="center">
            {week.map((day) => {
              const isStart = isStartOfRange(dateRange, day);
              const isEnd = isEndOfRange(dateRange, day);
              const isRangeOneDay = isRangeSameDay(dateRange);
              const highlighted =
                inDateRange(dateRange, day) || helpers.isInHoverRange(day);

              return (
                <Day
                  key={format(day, "dd-MM-yyyy")}
                  filled={isStart || isEnd}
                  outlined={isToday(day)}
                  highlighted={highlighted && !isRangeOneDay}
                  disabled={
                    !isSameMonth(currentDate, day) ||
                    !(
                      isWithinInterval(day, { start: minDate, end: maxDate }) ||
                      isStartOfRange(
                        {
                          startDate: minDate,
                          endDate: maxDate,
                        },
                        day
                      )
                    )
                  }
                  hidden={!isSameMonth(currentDate, day)}
                  hideOutsideMonthDays={hideOutsideMonthDays}
                  startOfRange={isStart && !isRangeOneDay}
                  endOfRange={isEnd && !isRangeOneDay}
                  onClick={() => handlers.handleClickDateNumber(day)}
                  onHover={() => handlers.handleHoverDateNumber(day)}
                  value={getDate(day)}
                />
              );
            })}
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Month;
