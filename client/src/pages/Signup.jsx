import React, { useState } from "react";
import axios from "axios";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SignupFormValidation } from "../utils/Validation";
import { Form, Link, useActionData, redirect } from "react-router-dom";

import AppsIcon from "../utils/AppsIcon";
import {
  Stack,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Alert,
} from "@mui/material";
import {
  EMAIL_IN_USE_ERROR,
  FAILED_REGISTRATION_ERROR,
  INVALID_FORM_ERROR,
  WEAK_PASSWORD_ERROR,
} from "../utils/Strings";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";
import TextFieldWithValidation from "../components/TextFieldWithValidation";

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const email = updates.email;
  const name = updates.name;
  const password = updates.password;
  const repassword = updates.repassword;

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

      await axios.post(apiUrl, requestBody);

      // console.log(response.data);
      authStatus = true;
    } else {
      authStatus = false;
      errorMessage = INVALID_FORM_ERROR;
    }
  } catch (error) {
    // console.log(error);

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

export function Signup() {
  const errors = useActionData();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  return (
    <Box className="grid place-items-center h-screen w-screen py-12">
      <Stack className="w-96">
        <AppsIcon isCenter={true} />
        <p className="mt-4 py-4">Buat akun Anda</p>
        <Form method="post">
          <Stack spacing={1.5}>
            <Stack spacing={0.25}>
              <EmailField value={email} setValue={setEmail} />
              <TextFieldWithValidation
                name="name"
                label="Nama"
                value={name}
                setValue={setName}
              />
              <PasswordField
                name="password"
                label="Password"
                value={password}
                setValue={setPassword}
              />
              <PasswordField
                name="repassword"
                label="Ulangi Password"
                value={repassword}
                setValue={setRepassword}
              />
              <FormControlLabel
                required
                control={<Checkbox color="success" size="small" />}
                label={
                  <span style={{ fontSize: "medium" }}>
                    Saya menyetujui{" "}
                    <Link className="text-green-900 hover:underline">
                      Syarat & Ketentuan
                    </Link>{" "}
                    yang berlaku
                  </span>
                }
              />
            </Stack>
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
                visibility: errors ? "visible" : "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {errors?.error}
            </Alert>
          </Stack>
        </Form>
        <p className="text-center my-2">
          Sudah punya Akun?
          <Link to={`/login`} className="mx-2 text-green-900 hover:underline">
            Masuk disini
          </Link>
        </p>
        {/* <Divider>or</Divider>
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
        </Form> */}
      </Stack>
    </Box>
  );
}
