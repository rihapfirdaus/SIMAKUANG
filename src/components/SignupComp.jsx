import React from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Stack,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import FormAuth from "./FormAuth";
import { Form, Link } from "react-router-dom";

export default function SignupComp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const form = () => {
    return (
      <Form>
        <Stack spacing={2}>
          <TextField
            id="form-signup__email"
            label="Email"
            type="email"
            color="success"
          />
          <Stack direction="row" spacing={2}>
            <TextField
              id="form-signup__username"
              label="Username"
              type="text"
              color="success"
              fullWidth
            />
            <TextField
              id="form-signup__name"
              label="Name"
              type="text"
              color="success"
              fullWidth
            />
          </Stack>

          <TextField
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            color="success"
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
          <TextField
            id="login-password"
            label="Re-Password"
            type={showPassword ? "text" : "password"}
            color="success"
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

          <FormControlLabel
            required
            control={<Checkbox color="success" />}
            label="Saya menyetuji `Syarat & Ketentuan` yang berlaku"
          />
        </Stack>
        <Button
          size="large"
          variant="contained"
          color="success"
          sx={{ my: 2, p: 1.5 }}
        >
          Sign Up
        </Button>
      </Form>
    );
  };
  return (
    <FormAuth
      label={"Sign up"}
      formComp={form}
      message={"Have an Account?"}
      linkLabel={"Login now"}
    />
  );
}
