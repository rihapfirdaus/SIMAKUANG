import React from "react";
import { TextField, useMediaQuery, useTheme } from "@mui/material";

export default ({ name, label, value, setValue }) => {
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));
  return (
    <TextField
      size={breakpoint ? "medium" : "small"}
      multiline
      name={name}
      label={label}
      rows={2}
      color="success"
      value={value}
      onInput={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
