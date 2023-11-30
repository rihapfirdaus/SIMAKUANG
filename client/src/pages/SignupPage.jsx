import React, { useState } from "react";
import axios from "axios";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  EmailValidation,
  InputValidation,
  PasswordValidation,
  RepasswordValidation,
  SignupFormValidation,
} from "../utils/Validation";
import { Form, Link, useActionData, redirect } from "react-router-dom";

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
  Divider,
  Box,
  Alert,
} from "@mui/material";
import {
  EMAIL_IN_USE_ERROR,
  FAILED_REGISTRATION_ERROR,
  WEAK_PASSWORD_ERROR,
} from "../utils/Strings";

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const email = updates.email;
  const name = updates.name;
  const password = updates.password;
  const repassword = updates.repassword;
  console.log("hah??");
  console.log(SignupFormValidation(email, name, password, repassword));
  console.log(email, name, password, repassword);

  var authStatus;
  var errorMessage;

  try {
    if (SignupFormValidation(email, name, password, repassword)) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;
      const apiUrl = "https://saldo-siaga-api.vercel.app/user";
      const requestBody = {
        uid: uid,
        email: email,
        displayName: name,
      };
      const response = await axios.post(apiUrl, requestBody);

      console.log(response.data);
      authStatus = true;
    } else {
      authStatus = false;
      errorMessage = INVALID_FORM_ERROR;
    }
  } catch (error) {
    console.log(error);

    authStatus = false;
    if (error.code === "auth/email-already-in-use") {
      errorMessage = EMAIL_IN_USE_ERROR;
    } else if (error.code === "auth/weak-password") {
      errorMessage = WEAK_PASSWORD_ERROR;
    } else {
      errorMessage = FAILED_REGISTRATION_ERROR;
    }
  }

  return authStatus ? redirect("/") : { error: errorMessage };
}

export default function SignupPage() {
  const errors = useActionData();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const [emailValidation, setEmailValidation] = useState({
    valid: true,
    errorMessage: "",
  });
  const [nameValidation, setNameValidation] = useState({
    valid: true,
    errorMessage: "",
  });
  const [passwordValidation, setPasswordValidation] = useState({
    valid: true,
    errorMessage: "",
  });
  const [repasswordValidation, setRepasswordValidation] = useState({
    valid: true,
    errorMessage: "",
  });

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
        <p style={{ textAlign: "start" }}>Buat akun Anda</p>
        <Form method="post">
          <Stack spacing={2}>
            <TextField
              error={!emailValidation.valid}
              helperText={emailValidation.errorMessage}
              name="email"
              label="Email"
              type="email"
              color="success"
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
                setEmailValidation(EmailValidation(e.target.value));
              }}
              onBlur={() => setEmailValidation(EmailValidation(email))}
            />
            <TextField
              error={!nameValidation.valid}
              helperText={nameValidation.errorMessage}
              name="name"
              label="Nama"
              type="text"
              color="success"
              value={name}
              onInput={(e) => {
                setName(e.target.value);
                setNameValidation(InputValidation(e.target.value));
              }}
              onBlur={() => setNameValidation(InputValidation(name))}
            />
            <TextField
              error={!passwordValidation.valid}
              helperText={passwordValidation.errorMessage}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              color="success"
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
            <TextField
              error={!repasswordValidation.valid}
              helperText={repasswordValidation.errorMessage}
              name="repassword"
              label="Re-Password"
              type={showRepassword ? "text" : "password"}
              color="success"
              value={repassword}
              onInput={(e) => {
                setRepassword(e.target.value);
                setRepasswordValidation(
                  RepasswordValidation(password, e.target.value)
                );
              }}
              onBlur={() =>
                setRepasswordValidation(
                  RepasswordValidation(password, repassword)
                )
              }
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
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="success"
              sx={{ my: 2, p: 1.5 }}
            >
              Daftar
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
          Sudah punya akun?
          <Link to={`/login`} className="text-link change-auth">
            Masuk disini
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
            Daftar dengan akun Google
          </Button>
        </Form>
      </Stack>
    </Box>
  );
}
