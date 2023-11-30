import React, { useState } from "react";
import axios from "axios";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  EmailValidation,
  LoginFormValidation,
  PasswordValidation,
} from "../utils/Validation";
import {
  Link,
  Form,
  useActionData,
  redirect,
  useNavigate,
} from "react-router-dom";

import AppsIcon from "../utils/AppsIcon";
import { VisibilityOff, Visibility, Google } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  Alert,
  TextField,
  Stack,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { INVALID_ACCOUNT_ERROR, INVALID_FORM_ERROR } from "../utils/Strings";

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const email = updates.email;
  const password = updates.password;

  var authStatus;
  var errorMessage;

  try {
    if (LoginFormValidation(email, password)) {
      await axios.get(`https://saldo-siaga-api.vercel.app/user/${email}`);
      await signInWithEmailAndPassword(auth, email, password);

      authStatus = true;
    } else {
      authStatus = false;
      errorMessage = INVALID_FORM_ERROR;
    }
  } catch (error) {
    console.log(error);

    authStatus = false;
    errorMessage = INVALID_ACCOUNT_ERROR;
  }

  return authStatus ? redirect("/") : { error: errorMessage };
}

export default function LoginPage() {
  const errors = useActionData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValidation, setEmailValidation] = useState({
    valid: true,
    errorMessage: "",
  });
  const [paswordValidation, setPasswordValidation] = useState({
    valid: true,
    errorMessage: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box className="form-container">
      <Stack className="form-auth">
        <AppsIcon />
        <p style={{ textAlign: "start" }}>Masuk dengan akun Anda</p>
        <Form method="post">
          <Stack spacing={2}>
            <TextField
              error={!emailValidation.valid}
              helperText={emailValidation.errorMessage}
              label="Email"
              type="email"
              color="success"
              name="email"
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
                setEmailValidation(EmailValidation(e.target.value));
              }}
              onBlur={() => setEmailValidation(EmailValidation(email))}
            />
            <TextField
              error={!paswordValidation.valid}
              helperText={paswordValidation.errorMessage}
              label="Password"
              type={showPassword ? "text" : "password"}
              color="success"
              name="password"
              value={password}
              onInput={(e) => {
                setPassword(e.target.value);
                setPasswordValidation(PasswordValidation(e.target.value));
              }}
              onBlur={() => setPasswordValidation(PasswordValidation(password))}
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
            <Link className="text-link forgot-pw">lupa password?</Link>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="success"
              sx={{ my: 2, p: 1.5 }}
            >
              Masuk
            </Button>
            <Alert
              severity="error"
              sx={{
                display: errors ? "flex" : "none",
                justifyContent: "center",
              }}
            >
              {errors?.error}
            </Alert>
          </Stack>
        </Form>
        <p>
          Belum punya Akun?
          <Link to={`/signup`} className="text-link change-auth">
            Buat akun disini
          </Link>
        </p>
        <Divider>or</Divider>
        <Form method="post" action="/google-auth">
          <Button
            type="submit"
            variant="outlined"
            startIcon={<Google color="success" />}
            color="success"
            sx={{ my: 2, p: 1.5 }}
          >
            Masuk dengan akun Google
          </Button>
        </Form>
      </Stack>
    </Box>
  );
}
