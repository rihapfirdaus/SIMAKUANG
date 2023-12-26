import React from "react";
import { TextField, useMediaQuery, useTheme } from "@mui/material";

export default ({ name, label, value, setValue, required, disabled }) => {
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <TextField
      required={required}
      name={name}
      size={breakpoint ? "medium" : "small"}
      label={label}
      value={value}
      disabled={disabled}
      color="success"
      sx={{ width: "100%" }}
      onInput={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
