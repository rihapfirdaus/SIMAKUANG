import React, { useState } from "react";
import { LoginFormValidation } from "../utils/Validation";
import { Link, Form, useActionData, redirect } from "react-router-dom";

import { Alert, Stack, Button, Box } from "@mui/material";
import { INVALID_ACCOUNT_ERROR, INVALID_FORM_ERROR } from "../utils/Strings";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import AppsIcon from "../utils/AppsIcon";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const email = updates.email;
  const password = updates.password;

  var errorMessage;

  try {
    if (LoginFormValidation(email, password)) {
      await axios.get(`https://saldo-siaga-api.vercel.app/user/${email}`);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      return redirect(`/app/${userId}/home`);
      // authStatus = true;
    } else {
      // authStatus = false;
      errorMessage = INVALID_FORM_ERROR;
    }
  } catch (error) {
    // console.log(error);

    // authStatus = false;
    errorMessage = INVALID_ACCOUNT_ERROR;
  }

  return { error: errorMessage };
}

export function Login() {
  // const errors = useActionData();

  const errors = {
    error:
      "For demo you can use email: rihapfirdaus09@gmail.com and password: 1234abcd. Current ui is better on mobile",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [spinner, setSpinner] = useState(false);

  return (
    <Box className="grid place-items-center h-screen w-screen py-12">
      <Stack className="w-96">
        <AppsIcon isCenter={true} />
        <p className="mt-4 py-4">Masuk dengan akun Anda</p>
        <Form method="post">
          <Stack spacing={2}>
            <EmailField value={email} setValue={setEmail} />
            <PasswordField
              name="password"
              label="Password"
              value={password}
              setValue={setPassword}
            />
            <Link className="text-green-900 hover:underline text-end">
              lupa password?
            </Link>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="success"
              sx={{ my: 2, p: 1.5, height: "50px" }}
            >
              {spinner ? (
                <img src="spinner.svg" className="spinner"></img>
              ) : (
                "Masuk"
              )}
            </Button>
            <Alert
              severity="error"
              sx={{
                visibility: errors ? "display" : "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {errors?.error}
            </Alert>
          </Stack>
        </Form>
        <p className="text-center my-2">
          Belum punya Akun?
          <Link to={`/signup`} className="mx-2 text-green-900 hover:underline">
            Buat akun disini
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
            Masuk dengan akun Google
          </Button>
        </Form> */}
      </Stack>
    </Box>
  );
}
