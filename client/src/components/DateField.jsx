import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useMediaQuery, useTheme } from "@mui/material";

export default ({ label, name, value, setValue, isDateline }) => {
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label={label}
        name={name}
        disablePast={isDateline ? true : false}
        disableFuture={isDateline ? false : true}
        format="DD/MM/YYYY"
        value={moment(value)}
        slotProps={{ textField: { size: breakpoint ? "medium" : "small" } }}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
        sx={{
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
