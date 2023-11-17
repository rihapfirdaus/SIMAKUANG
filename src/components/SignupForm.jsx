import React from "react";
import AppsIcon from "./AppsIcon";
import {
  VisibilityOff,
  Facebook,
  Visibility,
  Google,
} from "@mui/icons-material";
import {
  Divider,
  Link,
  Box,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

export default function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      className="form-auth"
      component="form"
      sx={{
        "& > :not(style)": { width: "48ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <AppsIcon />
      <Stack spacing={2}>
        <h1>Sign up</h1>
        <TextField
          id="form-signup__email"
          label="Email"
          type="text"
          color="success"
        />
        <TextField
          id="form-signup__username"
          label="Username"
          type="text"
          color="success"
        />
        <TextField
          id="form-signup__name"
          label="Name"
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
        <Button
          size="large"
          variant="contained"
          color="success"
          sx={{ padding: 1.5 }}
        >
          Signup
        </Button>

        <Typography variant="string" textAlign="center">
          Have an account?
          <Link
            href="/login"
            underline="hover"
            color="darkgreen"
            sx={{ mx: 1 }}
          >
            Login now
          </Link>
        </Typography>
        <Divider>or</Divider>
        <Button
          variant="outlined"
          startIcon={<Google color="success" />}
          color="success"
          sx={{ padding: 1.5 }}
        >
          Signup with Google
        </Button>
      </Stack>
    </Box>
  );
}
