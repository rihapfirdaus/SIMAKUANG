import React from "react";
import {
  TextField,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default ({ name, label, value, setValue }) => {
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <TextField
      size={breakpoint ? "medium" : "small"}
      name={name}
      label={label}
      value={value}
      color="success"
      InputProps={{
        startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
      }}
      onInput={(e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
          setValue(e.target.value);
        }
      }}
    />
  );
};
