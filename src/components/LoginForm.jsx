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

export default function LoginForm() {
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
        <h1>Log in</h1>
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
        <Link href="#" underline="hover" textAlign="end" color="darkgreen">
          forgot password?
        </Link>

        <Button
          size="large"
          variant="contained"
          color="success"
          sx={{ padding: 1.5 }}
        >
          Login
        </Button>

        <Typography variant="string" textAlign="center">
          Dont have an account?
          <Link
            href="/signup"
            underline="hover"
            color="darkgreen"
            sx={{ mx: 1 }}
          >
            Create an Account
          </Link>
        </Typography>
        <Divider>or</Divider>
        <Button
          variant="outlined"
          startIcon={<Google color="success" />}
          color="success"
          sx={{ padding: 1.5 }}
        >
          Login with Google
        </Button>
      </Stack>
    </Box>
  );
}
