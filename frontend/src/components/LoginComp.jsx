import React, { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import AppsIcon from "../utils/AppsIcon";
import { Google } from "@mui/icons-material";
import { createTheme, textFieldClasses } from "@mui/material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Stack,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { loginWithEmailAndPassword, authWithGoogle } from "../containers/auth";

export default function LoginComp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = createTheme();
  const size = theme.breakpoints.down("sm") ? "small" : "large";

  return (
    <Box className="form-container">
      <Stack className="form-auth">
        <AppsIcon />
        <h1>Log in</h1>
        <Form onSubmit={loginWithEmailAndPassword}>
          <Stack spacing={2}>
            <TextField
              id="username"
              label="Username/Email"
              type="text"
              color="success"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="login-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              color="success"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Link className="text-link forgot-pw">forgot password?</Link>
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
        <p>
          Don't have an Account?
          <Link to={`/signup`} className="text-link change-auth">
            Create an Account
          </Link>
        </p>
        <Divider>or</Divider>
        <Form>
          <Button
            variant="outlined"
            startIcon={<Google color="success" />}
            color="success"
            sx={{ my: 2, p: 1.5 }}
            onClick={authWithGoogle}
          >
            Log in with Google
          </Button>
        </Form>
      </Stack>
    </Box>
  );
}
