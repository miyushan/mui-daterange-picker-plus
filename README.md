# Preview

![Desktop Screenshot](/Screenshot-Desktop.png?raw=true "Screenshot-Desktop")

# MUI Date Range Picker

An advanced and highly customizable Date Range Picker component for Material-UI (MUI).

[![npm version](https://img.shields.io/npm/v/mui-daterange-picker-plus?style=flat-square)](https://www.npmjs.com/package/mui-daterange-picker-plus)
[![License](https://img.shields.io/npm/l/mui-daterange-picker-plus.svg?style=flat-square)](https://opensource.org/licenses/MIT)

View Demo [here](https://mui-daterange-picker-plus-playground.vercel.app/demo) ✨

[![Edit mui-daterange-picker-plus](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/zealous-poitras-jrckkw?file=%2Fsrc%2FPickerBase.tsx&embed=1)

# Table of Contents

- [Preview](#preview)
- [MUI Date Range Picker](#mui-date-range-picker)
- [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage with Examples](#usage-with-examples)
    - [1. Picker Model (Basic)](#1-picker-model-basic)
    - [2. Picker Base (Basic)](#2-picker-base-basic)
    - [3. Picker Model (Advanced)](#3-picker-model-advanced)
    - [4. Picker Base (Advanced)](#4-picker-base-advanced)
  - [Customization using Props](#customization-using-props)
    - [PickerProps](#pickerprops)
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

### 1. Picker Model (Basic)

```jsx
import { useState } from "react";
import Button from "@mui/material/Button";
import { PickerModal } from "mui-daterange-picker-plus";
import type { DateRange } from "mui-daterange-picker-plus";

export default function YourComponent() {
   // state + handlers for the Modal
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

 // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState<DateRange>({});
  const [dateRangeOnSubmit, setDateRangeOnSubmit] = useState<DateRange>({});
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
      <PickerModal
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

### 2. Picker Base (Basic)

```jsx
import { useState } from "react";
import { PickerBase } from "mui-daterange-picker-plus";
import type { DateRange } from "mui-daterange-picker-plus";

export default function YourComponent() {
  // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState<DateRange>({});
  const handleSetDateRangeOnChange = (dateRange: DateRange) => {
    setDateRangeOnChange(dateRange);
  };

  console.log("dateRangeOnChange", dateRangeOnChange);

  return (
    <PickerBase
      onChange={(range: DateRange) => handleSetDateRangeOnChange(range)}
    />
  );
}
```

### 3. Picker Model (Advanced)

```jsx
import { useState } from "react";
import Button from "@mui/material/Button";
import { PickerModal } from "mui-daterange-picker-plus";
import type { DateRange } from "mui-daterange-picker-plus";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function YourComponent() {
  // state + handlers for the Modal
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

 // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState<DateRange>({});
  const [dateRangeOnSubmit, setDateRangeOnSubmit] = useState<DateRange>({});
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
      <PickerModal
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

### 4. Picker Base (Advanced)

```jsx
import { useState } from "react";
import { PickerBase } from "mui-daterange-picker-plus";
import type { DateRange } from "mui-daterange-picker-plus";

export default function YourComponent() {
  // state + handlers for the DateRange Value
  const [dateRangeOnChange, setDateRangeOnChange] = useState<DateRange>({});
  const handleSetDateRangeOnChange = (dateRange: DateRange) => {
    setDateRangeOnChange(dateRange);
  };

  console.log("dateRangeOnChange", dateRangeOnChange);

  return (
    <PickerBase
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

### PickerProps

| Prop                   | Type                             | Default                                 | Description                                                            |
| :--------------------- | :------------------------------- | :-------------------------------------- | :--------------------------------------------------------------------- |
| `initialDateRange`     | `DateRange`                      | -                                       | Initial date range for the picker.                                     |
| `definedRanges`        | `DefinedRange[]`                 | -                                       | Predefined date ranges for quick selection.                            |
| `minDate`              | `Date \| string`                 | startOfYear(addYears( new Date(), -10)) | Minimum selectable date.                                               |
| `maxDate`              | `Date \| string`                 | endOfYear(addYears( new Date(), 10))    | Maximum selectable date.                                               |
| `onChange`             | `(dateRange: DateRange) => void` | -                                       | Callback function triggered on date range change.                      |
| `locale`               | `Locale`                         | -                                       | Locale for date formatting.                                            |
| `labels`               | `Labels`                         | -                                       | Customize labels used in UI (Apply, Cancel, Start Date, End Date etc.) |
| `hideDefaultRanges`    | `boolean`                        | false                                   | Option to hide default predefined ranges.                              |
| `hideOutsideMonthDays` | `boolean`                        | true                                    | Option to hide days outside the current month.                         |

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
import { PickerProps, ModalCustomProps } from "./utils";

type PickerModalProps = PickerProps & {
  modalProps: PopoverProps;
  customProps: ModalCustomProps;
};

type PickerBaseProps = PickerProps;
```

> In the above examples, the `PickerBase` has included `PickerBaseProps` props. Same as that, `PickerModal` has included `PickerModalProps` props.

- The `PickerProps`, `ModalCustomProps` types are utility types and you can refer them as per your requirement. ( With or Without Modal)

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

type PickerProps = {
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
