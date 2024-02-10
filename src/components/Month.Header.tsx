import { getMonth, getYear, setMonth, setYear } from "date-fns";
import type { Locale, Month } from "date-fns";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  useTheme,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { AVAILABLE_MAX_DATE, AVAILABLE_MIN_DATE } from "../Constants";

type MonthHeaderProps = {
  minDate: Date;
  maxDate: Date;
  marker: symbol;
  currentDate: Date;
  otherDate: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
  locale?: Locale;
};

const generateYears = ({ start, end }: { start: number; end: number }) => {
  const count = end - start + 1;

  return Array(count)
    .fill(0)
    .map((_y, i) => start + i);
};

export const MonthHeader = ({
  minDate,
  maxDate,
  currentDate,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
  locale,
}: MonthHeaderProps) => {
  const theme = useTheme();

  const availableYearRange = {
    start: ((minDate as Date) || AVAILABLE_MIN_DATE).getFullYear(),
    end: ((maxDate as Date) || AVAILABLE_MAX_DATE).getFullYear(),
  };

  const MONTHS = Array.from({ length: 12 }, (_, index) =>
    typeof locale !== "undefined"
      ? locale.localize?.month(index as Month, {
          width: "abbreviated",
          context: "standalone",
        })
      : [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ][index]
  );

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(currentDate, parseInt(event.target.value as string, 10)));
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(currentDate, parseInt(event.target.value as string, 10)));
  };

  const currentMonth = getMonth(currentDate);
  const currentYear = getYear(currentDate);
  // const otherMonth = getMonth(otherDate);
  // const otherYear = getYear(otherDate);

  const minYear = getYear(minDate);
  const maxYear = getYear(maxDate);
  const minMonthID = getMonth(minDate);
  const maxMonthID = getMonth(maxDate);

  const isDisabled = (month: number) => {
    // const isSameMonthSameYear =
    //   month === otherMonth && currentYear === otherYear;

    // if (marker !== MARKERS.SINGLE_MONTH) {
    // if (isSameMonthSameYear) {
    //   return true;
    // } else if (currentYear === otherYear) {
    //   if (isFirstMonth && month > otherMonth) {
    //     return true;
    //   } else if (!isFirstMonth && month < otherMonth) {
    //     return true;
    //   }
    // }
    // }

    // validations for out of given range
    if (currentYear === minYear || currentYear === maxYear) {
      if (currentYear === minYear && month < minMonthID) {
        return true;
      }
      if (currentYear === maxYear && month > maxMonthID) {
        return true;
      }
    }

    return false;
  };

  return (
    <>
      <Grid2 xs="auto" ml="10px">
        <IconButton
          disableRipple
          size="small"
          color="secondary"
          className="Mui-upon-secondary-bg"
          disabled={prevDisabled}
          onClick={onClickPrevious}
          sx={{
            borderRadius: "8px",
            color: theme.palette.grey[600],
            ".MuiSvgIcon-root": {
              color: theme.palette.grey[600],
            },
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },

            "&.Mui-disabled": {
              backgroundColor: "transparent",
            },

            "&.Mui-upon-secondary-bg": {
              // backgroundColor: grey[200],
              "&:hover": {
                backgroundColor: theme.palette.grey[200],
              },
            },
          }}
        >
          <KeyboardArrowLeftIcon
            fontSize="small"
            sx={{
              fill: prevDisabled ? `${theme.palette.grey[400]}` : "secondary",
            }}
          />
        </IconButton>
      </Grid2>

      <Grid2 xsOffset={"auto"} xs={"auto"}>
        <FormControl>
          <Select
            SelectDisplayProps={{
              style: {
                minHeight: "unset",
              },
            }}
            variant="outlined"
            size="small"
            defaultValue={currentYear}
            IconComponent={(props) => (
              <KeyboardArrowDownIcon
                fontSize="small"
                sx={{
                  fill: theme.palette.grey[400],
                }}
                {...props}
              />
            )}
            slotProps={{
              root: {
                sx: {
                  width: {
                    sm: "100px",
                    md: "120px",
                  },
                  height: "30px",
                  backgroundColor: "#fff",
                },
              },
            }}
            MenuProps={{
              disablePortal: true,
              PaperProps: {
                sx: {
                  width: "auto",
                  maxHeight: "224px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                },
              },
            }}
            value={currentMonth}
            onChange={handleMonthChange}
          >
            {MONTHS.map((month, idx) => {
              return (
                <MenuItem key={month} value={idx} disabled={isDisabled(idx)}>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {month}
                  </Typography>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 xsOffset={"auto"} xs="auto">
        <FormControl>
          <Select
            variant="outlined"
            size="small"
            defaultValue={currentYear}
            SelectDisplayProps={{
              style: {
                minHeight: "unset",
              },
            }}
            IconComponent={(props) => (
              <KeyboardArrowDownIcon
                fontSize="small"
                sx={{
                  fill: theme.palette.grey[400],
                }}
                {...props}
              />
            )}
            slotProps={{
              root: {
                sx: {
                  height: "30px",
                  backgroundColor: "#fff",
                },
              },
            }}
            MenuProps={{
              disablePortal: true,
              PaperProps: {
                sx: {
                  width: "auto",
                  maxHeight: "224px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                },
              },
            }}
            value={getYear(currentDate)}
            onChange={handleYearChange}
          >
            {generateYears(availableYearRange).map((year) => {
              // let disabled = false;
              //
              // if (marker !== MARKERS.SINGLE_MONTH) {
              //   if (isFirstYear && year > otherYear) {
              //     disabled = true;
              //   } else if (!isFirstYear && year < otherYear) {
              //     disabled = true;
              //   }
              // }

              return (
                <MenuItem key={year} value={year}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {year}
                  </Typography>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid2>

      <Grid2 mr="10px" xsOffset={"auto"} xs="auto">
        <IconButton
          disableRipple
          size="small"
          color="secondary"
          className="Mui-upon-secondary-bg"
          disabled={nextDisabled}
          onClick={onClickNext}
          sx={{
            borderRadius: "8px",
            color: theme.palette.grey[600],
            ".MuiSvgIcon-root": {
              color: theme.palette.grey[600],
            },
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },

            "&.Mui-disabled": {
              backgroundColor: "transparent",
            },

            "&.Mui-upon-secondary-bg": {
              "&:hover": {
                backgroundColor: theme.palette.grey[200],
              },
            },
          }}
        >
          <KeyboardArrowRightIcon
            fontSize="small"
            sx={{
              fill: nextDisabled ? `${theme.palette.grey[400]}` : "secondary",
            }}
          />
        </IconButton>
      </Grid2>
    </>
  );
};
