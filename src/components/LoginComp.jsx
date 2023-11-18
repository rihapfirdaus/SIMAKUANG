import React from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import FormAuth from "./FormAuth";

export default function LoginComp() {
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
            id="username"
            label="Username/Email"
            type="text"
            color="success"
          />
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
          <Link style={{ textAlign: "end", color: "darkgreen" }}>
            forgot password?
          </Link>
          <Button
            size="large"
            variant="contained"
            color="success"
            sx={{ my: 2, p: 1.5 }}
          >
            Log In
          </Button>
        </Stack>
      </Form>
    );
  };
  return (
    <FormAuth
      label={"Log in"}
      formComp={form}
      message={"Don't have an Account?"}
      linkLabel={"Create an account"}
    />
  );
}
