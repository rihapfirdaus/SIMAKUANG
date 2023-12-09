import React, { useState } from "react";
import { InputValidation } from "../utils/Validation";

import { TextField, useMediaQuery, useTheme } from "@mui/material";

export default ({ name, label, value, setValue }) => {
  const [validation, setValidation] = useState({
    valid: true,
    errorMessage: "",
  });

  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <TextField
      size={breakpoint ? "medium" : "small"}
      error={!validation.valid}
      helperText={validation.errorMessage}
      name={name}
      label={label}
      type="text"
      color="success"
      value={value}
      onInput={(e) => {
        setValue(e.target.value);
        setValidation(InputValidation(e.target.value));
      }}
      onBlur={() => setValidation(InputValidation(value))}
    />
  );
};
