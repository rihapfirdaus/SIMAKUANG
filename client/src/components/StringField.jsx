import React from "react";
import { TextField, useMediaQuery, useTheme } from "@mui/material";

export default ({ name, label, value, setValue }) => {
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <TextField
      name={name}
      size={breakpoint ? "medium" : "small"}
      label={label}
      value={value}
      color="success"
      onInput={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
