import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";

export default ({ label, name, value, setValue, isDateline, year, month }) => {
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  const getDatePickerValue = () => {
    if (value) {
      if (year) {
        return moment(new Date(value, 0, 1));
      } else if (month) {
        return moment(new Date(new Date().getFullYear(), value, 1));
      } else {
        return moment(value);
      }
    } else {
      return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        emptyLabel=""
        label={label}
        disablePast={month || year ? false : isDateline ? true : false}
        disableFuture={month || year ? false : isDateline ? false : true}
        format={year ? "YYYY" : month ? "MMM" : "DD/MM/YYYY"}
        value={getDatePickerValue()}
        views={year ? ["year"] : month ? ["month"] : ["day", "month", "year"]}
        slotProps={{
          textField: { size: breakpoint ? "medium" : "small", name: name },
        }}
        onChange={(date) => {
          year
            ? setValue(date.year())
            : month
            ? setValue(date.month())
            : setValue(date.toDate());
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: "2px solid darkgreen",
            },
          "& .MuiInputLabel-root.Mui-focused ": {
            color: "darkgreen",
          },
        }}
      />
    </LocalizationProvider>
  );
};
