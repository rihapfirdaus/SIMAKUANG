import React, { useState, useEffect } from "react";
import { LoginFormValidation } from "../utils/Validation";
import { Link, Form, useActionData, useNavigate } from "react-router-dom";

import { Alert, Stack, Button, Box, CircularProgress } from "@mui/material";
import { INVALID_ACCOUNT_ERROR, INVALID_FORM_ERROR } from "../utils/Strings";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import AppsIcon from "../utils/AppsIcon";
import EmailField from "../components/EmailField";
import PasswordField from "../components/PasswordField";

export async function action({ request }) {
  const baseUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const email = updates.email;
  const password = updates.password;

  try {
    if (LoginFormValidation(email, password)) {
      const response = await axios.get(`${baseUrl}/user/${email}`);

      const user = response.data;
      const userId = user._id;

      await signInWithEmailAndPassword(auth, email, password);

      return { status: "200", message: "Login Berhasil", userId };
    } else {
      return { status: "404", message: INVALID_FORM_ERROR };
    }
  } catch (error) {
    console.log(error);
    return { status: "404", message: INVALID_ACCOUNT_ERROR, error };
  }
}

export function Login() {
  const status = useActionData() || "";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (Object.entries(status).length > 0) {
      setShow(true);
      setSpinner(false);
    }

    if (status.status === "200") {
      setTimeout(() => {
        setShow(false);
        navigate(`/app/${status.userId}/home`);
      }, 1500);
    }
  }, [status]);
  useEffect(() => {
    if (Object.entries(status).length > 0) {
      setShow(false);
    }
  }, [email, password]);

  return (
    <Box className="grid place-items-center h-screen w-screen py-12">
      <Stack className="w-96">
        <AppsIcon isCenter={true} />
        <p className="mt-4 py-4">Masuk dengan akun Anda</p>
        <Form
          method="post"
          onSubmit={() => {
            setSpinner(true);
          }}
        >
          <Stack spacing={1.5}>
            <Stack spacing={0.25}>
              <EmailField value={email} setValue={setEmail} />
              <PasswordField
                name="password"
                label="Password"
                value={password}
                setValue={setPassword}
              />
            </Stack>
            <Link
              className="text-green-900 hover:underline text-end"
              // to={`/forgot-password`}
            >
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
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Masuk"
              )}
            </Button>
            <Alert
              severity={status?.status === "200" ? "success" : "error"}
              sx={{
                visibility: show ? "visible" : "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {status?.message}
            </Alert>
          </Stack>
        </Form>
        <p className="text-center my-2">
          Belum punya Akun?
          <Link to={`/signup`} className="mx-2 text-green-900 hover:underline">
            Buat akun disini
          </Link>
        </p>
      </Stack>
    </Box>
  );
}
