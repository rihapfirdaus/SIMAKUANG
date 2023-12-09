import React from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default ({ label, value, defaultValue, setValue, options }) => {
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <>
      <InputLabel color="success">{label}</InputLabel>
      <Select
        size={breakpoint ? "medium" : "small"}
        label={label}
        value={value}
        defaultValue={defaultValue || options[0].value}
        color="success"
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
