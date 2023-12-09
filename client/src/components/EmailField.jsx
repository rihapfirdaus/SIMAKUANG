import React, { useState } from "react";
import { EmailValidation } from "../utils/Validation";

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
      label={label || "Email"}
      type="email"
      color="success"
      name={name || "email"}
      value={value}
      onInput={(e) => {
        setValue(e.target.value);
        setValidation(EmailValidation(e.target.value));
      }}
      onBlur={() => setValidation(EmailValidation(value))}
    />
  );
};
