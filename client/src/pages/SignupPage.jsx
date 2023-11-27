import React, { useState } from "react";
import AppsIcon from "../utils/AppsIcon";
import { VisibilityOff, Visibility, Google } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Stack,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { Form, Link } from "react-router-dom";
import { authWithGoogle, signupWithEmailAndPassword } from "../containers/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepassword, setShowRepassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepassword = () => setShowRepassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownRepassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box className="form-container">
      <Stack className="form-auth">
        <AppsIcon />
        <h1>Sign up</h1>
        <Form onSubmit={signupWithEmailAndPassword}>
          <Stack spacing={2}>
            <TextField
              id="form-signup__email"
              label="Email"
              type="email"
              color="success"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="form-signup__name"
              label="Name"
              type="text"
              color="success"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <TextField
              id="login-password"
              label="Re-Password"
              type={showRepassword ? "text" : "password"}
              color="success"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle repassword visibility"
                      onClick={handleClickShowRepassword}
                      onMouseDown={handleMouseDownRepassword}
                    >
                      {showRepassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              required
              control={<Checkbox color="success" size="small" />}
              label={
                <span style={{ fontSize: "medium" }}>
                  Saya menyetujui{" "}
                  <Link className="text-link">Syarat & Ketentuan</Link> yang
                  berlaku
                </span>
              }
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
        <p>
          Have an Account?
          <Link to={`/login`} className="text-link change-auth">
            Login now
          </Link>
        </p>
        <Divider>or</Divider>
        <Form method="post" action="/login/google-auth">
          <Button
            variant="outlined"
            startIcon={<Google color="success" />}
            color="success"
            sx={{ my: 2, p: 1.5 }}
            type="submit"
          >
            Sign Up with Google
          </Button>
        </Form>
      </Stack>
    </Box>
  );
}
