# Preview

![Desktop Screenshot](/Screenshot-Desktop.png?raw=true "Screenshot-Desktop")

# MUI Date Range Picker

An advanced and highly customizable Date Range Picker component for Material-UI (MUI).

[![npm version](https://img.shields.io/npm/v/mui-daterange-picker-plus?style=flat-square)](https://www.npmjs.com/package/mui-daterange-picker-plus)
[![License](https://img.shields.io/npm/l/mui-daterange-picker.svg?style=flat-square)](https://opensource.org/licenses/MIT)

View Demo [here](https://mui-daterange-picker-plus-playground.vercel.app/demo) ✨

[![Edit mui-daterange-picker-plus](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/zealous-poitras-jrckkw?file=%2Fsrc%2FPickerBase.tsx&embed=1)

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage with Examples](#examples)
  - [Date Picker Model (Basic)](#1-date-picker-model-basic)
  - [Date Picker Base (Basic)](#2-date-picker-base-basic)
  - [Date Picker Model (Advanced)](#3-date-picker-model-advanced)
  - [Date Picker Base (Advanced)](#4-date-picker-base-advanced)
- [Customization using Props](#customization-using-props)
  - [DateRangeProps](#daterangeprops)
  - [ModalCustomProps](#modalcustomprops)
- [Useful Types](#useful-types)
  - [Main Types](#main-types)
  - [Utility Types](#utility-types)
- [License](#license)

## Features

- **Date Range Selection:** Select a date range with ease.
- **Rich UI/UX:** Enjoy an enhanced user experience with a feature-rich Date Range Picker.
- **Responsive Design:** Works seamlessly on all devices and screen sizes (Mobile Optimized).
- **Customization:** A large set of customization options to meet your specific needs.
- **Min and Max Date:** Set minimum and maximum selectable dates.
- **Defined Ranges:** Use predefined date ranges for quick selection. You can add your custom ranges as well.
- **Event Handling:** Easily handle changes and submissions with customizable callbacks.
- **Locale Support:** Localized date formatting for a global audience.

## Installation

Install the MUI Date Range Picker package via npm:

```bash
npm install mui-daterange-picker-plus
```

## Usage with Examples

### 1. Date Picker Model (Basic)

```jsx
import { useState } from "react";
import { DateRange, DateRangePickerModal } from "mui-daterange-picker-plus";
import Button from "@mui/material/Button";

export default function YourComponent() {
  // state + handlers for the Modal
  const [anchorEl, setAnchorEl] =
    (useState < HTMLButtonElement) | (null > null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState < DateRange > {};
  const [dateRangeOnSubmit, setDateRangeOnSubmit] = useState < DateRange > {};
  const handleSetDateRangeOnChange = (dateRange: DateRange) => {
    setDateRangeOnChange(dateRange);
    handleSetDateRangeOnSubmit({});
  };
  const handleSetDateRangeOnSubmit = (dateRange: DateRange) => {
    setDateRangeOnSubmit(dateRange);
    // handleClose(); // close the modal
  };

  console.log("dateRangeOnChange", dateRangeOnChange);
  console.log("dateRangeOnSubmit", dateRangeOnSubmit);

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        View Picker Model
      </Button>
      <DateRangePickerModal
        onChange={(range: DateRange) => handleSetDateRangeOnChange(range)}
        customProps={{
          onSubmit: (range: DateRange) => handleSetDateRangeOnSubmit(range),
          onCloseCallback: handleClose,
        }}
        modalProps={{
          open,
          anchorEl,
          onClose: handleClose,
          slotProps: {
            paper: {
              sx: {
                borderRadius: "16px",
                boxShadow: "rgba(0, 0, 0, 0.21) 0px 0px 4px",
              },
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        }}
      />
    </>
  );
}
```

### 2. Date Picker Base (Basic)

```jsx
import { useState } from "react";
import { DateRange, DateRangePicker } from "mui-daterange-picker-plus";

export default function YourComponent() {
  // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState < DateRange > {};
  const handleSetDateRangeOnChange = (dateRange: DateRange) => {
    setDateRangeOnChange(dateRange);
  };

  console.log("dateRangeOnChange", dateRangeOnChange);

  return (
    <DateRangePicker
      onChange={(range: DateRange) => handleSetDateRangeOnChange(range)}
    />
  );
}
```

### 3. Date Picker Model (Advanced)

```jsx
import { useState } from "react";
import { DateRange, DateRangePickerModal } from "mui-daterange-picker-plus";
import {
  ArrowCircleRight,
  ArrowCircleDown,
} from "@mui/icons-material/ArrowCircleRight";
import Button from "@mui/material/Button";

export default function YourComponent() {
  // state + handlers for the Modal
  const [anchorEl, setAnchorEl] =
    (useState < HTMLButtonElement) | (null > null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState < DateRange > {};
  const [dateRangeOnSubmit, setDateRangeOnSubmit] = useState < DateRange > {};
  const handleSetDateRangeOnChange = (dateRange: DateRange) => {
    setDateRangeOnChange(dateRange);
    handleSetDateRangeOnSubmit({});
  };
  const handleSetDateRangeOnSubmit = (dateRange: DateRange) => {
    setDateRangeOnSubmit(dateRange);
    // handleClose(); // close the modal
  };

  console.log("dateRangeOnChange", dateRangeOnChange);
  console.log("dateRangeOnSubmit", dateRangeOnSubmit);

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        View Picker Model
      </Button>
      <DateRangePickerModal
        hideOutsideMonthDays={false}
        initialDateRange={{
          startDate: new Date(),
          endDate: new Date("2024-12-31"),
        }}
        minDate={new Date("2023-08-02")}
        maxDate={new Date("2025-02-04")}
        onChange={(range: DateRange) => handleSetDateRangeOnChange(range)}
        customProps={{
          onSubmit: (range: DateRange) => handleSetDateRangeOnSubmit(range),
          onCloseCallback: handleClose,
          RangeSeparatorIcons: {
            xs: ArrowCircleDownIcon,
            md: ArrowCircleRightIcon,
          },
        }}
        modalProps={{
          open,
          anchorEl,
          onClose: handleClose,
          slotProps: {
            paper: {
              sx: {
                borderRadius: "16px",
                boxShadow: "rgba(0, 0, 0, 0.21) 0px 0px 4px",
              },
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        }}
      />
    </>
  );
}
```

### 4. Date Picker Base (Advanced)

```jsx
import { useState } from "react";
import { DateRange, DateRangePicker } from "mui-daterange-picker-plus";

export default function YourComponent() {
  // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState < DateRange > {};
  const handleSetDateRangeOnChange = (dateRange: DateRange) => {
    setDateRangeOnChange(dateRange);
  };

  console.log("dateRangeOnChange", dateRangeOnChange);

  return (
    <DateRangePicker
      hideOutsideMonthDays={false}
      initialDateRange={{
        startDate: new Date("2023-09-15"),
        endDate: new Date("2024-12-31"),
      }}
      minDate={new Date("2023-08-02")}
      maxDate={new Date("2025-02-04")}
      onChange={(range: DateRange) => handleSetDateRangeOnChange(range)}
    />
  );
}
```

## Customization using Props

### DateRangeProps

| Prop                   | Type                             | Default                                 | Description                                       |
| :--------------------- | :------------------------------- | :-------------------------------------- | :------------------------------------------------ |
| `initialDateRange`     | `DateRange`                      | -                                       | Initial date range for the picker.                |
| `definedRanges`        | `DefinedRange[]`                 | -                                       | Predefined date ranges for quick selection.       |
| `minDate`              | `Date \| string`                 | startOfYear(addYears( new Date(), -10)) | Minimum selectable date.                          |
| `maxDate`              | `Date \| string`                 | endOfYear(addYears( new Date(), 10))    | Maximum selectable date.                          |
| `onChange`             | `(dateRange: DateRange) => void` | -                                       | Callback function triggered on date range change. |
| `locale`               | `Locale`                         | -                                       | Locale for date formatting.                       |
| `hideDefaultRanges`    | `boolean`                        | false                                   | Option to hide default predefined ranges.         |
| `hideOutsideMonthDays` | `boolean`                        | true                                    | Option to hide days outside the current month.    |

> Make sure to provide `initialDateRange` within the min and max date.

### ModalCustomProps

| Prop                  | Type                             | Default | Description                                           |
| :-------------------- | :------------------------------- | :------ | :---------------------------------------------------- |
| `onSubmit`            | `(dateRange: DateRange) => void` | -       | Callback function triggered on date range submission. |
| `onCloseCallback`     | `() => void`                     | -       | Callback function triggered on popover close.         |
| `RangeSeparatorIcons` | `RangeSeparatorIconsProps`       | -       | Icons for the range separator in different sizes.     |
| `hideActionsButtons`  | `boolean`                        | false   | Option to hide action buttons.                        |

## Useful Types

### Main Types

```tsx
import { PopoverProps } from "@mui/material/Popover";
import { DateRangeProps, ModalCustomProps } from "./utils";

type ModalPickerProps = DateRangeProps & {
  modalProps: PopoverProps;
  customProps: ModalCustomProps;
};

type BasicPickerProps = DateRangeProps;
```

> In the above examples, the `DateRangePicker` has included `BasicPickerProps` props. Same as that, `DateRangePickerModal` has included `ModalPickerProps` props.

- The `DateRangeProps`, `ModalCustomProps` types are utility types and you can refer them as per your requirement. ( With or Without Modal)

- In the below section, you can find the details of the utility types.

- The `PopoverProps` is a Material-UI Popover component props. You can refer to the [Material-UI Popover API](https://mui.com/api/popover/) for more details.

### Utility Types

```tsx
import { ElementType } from "react";
import { SvgIconProps } from "@mui/material";
import { Locale } from "date-fns";

type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

type DefinedRange = {
  startDate: Date;
  endDate: Date;
  label: string;
};

type RangeSeparatorIconsProps = {
  xs?: ElementType<SvgIconProps>;
  md?: ElementType<SvgIconProps>;
};

type DateRangeProps = {
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  locale?: Locale;
  onChange?: (dateRange: DateRange) => void;

  hideDefaultRanges?: boolean;
  hideOutsideMonthDays?: boolean;
};

type ModalCustomProps = {
  onSubmit?: (dateRange: DateRange) => void;
  onCloseCallback?: () => void;
  RangeSeparatorIcons?: RangeSeparatorIconsProps;
  hideActionButtons?: boolean;
};
```

> You can use these types as per your requirement.

## License

This project is licensed under the MIT License.
