import React, { useState } from "react";
import { PasswordValidation } from "../utils/Validation";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default ({ name, label, value, setValue }) => {
  const [validation, setValidation] = useState({
    valid: true,
    errorMessage: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const breakpoint = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <TextField
      size={breakpoint ? "medium" : "small"}
      error={!validation.valid}
      helperText={validation.errorMessage || " "}
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      color="success"
      value={value}
      onInput={(e) => {
        setValue(e.target.value);
        setValidation(PasswordValidation(e.target.value));
      }}
      onBlur={() => setValidation(PasswordValidation(value))}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
