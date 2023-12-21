import React, { useState, useEffect } from "react";
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
  CircularProgress,
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

      const userId = userCredential.user.uid;
      const apiUrl = "https://saldo-siaga-api.vercel.app/user";
      const requestBody = {
        uid: userId,
        email: email,
        displayName: name,
      };

      await axios.post(apiUrl, requestBody);

      return { status: "200", message: "Daftar Berhasil", userId };
    } else {
      return { status: "404", message: INVALID_FORM_ERROR };
    }
  } catch (error) {
    authStatus = false;
    if (error.code === "auth/email-already-in-use") {
      return { status: "404", message: EMAIL_IN_USE_ERROR };
    } else if (error.code === "auth/weak-password") {
      return { status: "404", message: WEAK_PASSWORD_ERROR };
    } else {
      return { status: "404", message: FAILED_REGISTRATION_ERROR };
    }
  }
}

export function Signup() {
  const status = useActionData() || "";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

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
  }, [email, name, password, repassword]);

  return (
    <Box className="grid place-items-center h-screen w-screen py-12">
      <Stack className="w-96">
        <AppsIcon isCenter={true} />
        <p className="mt-4 py-4">Buat akun Anda</p>
        <Form
          method="post"
          onSubmit={() => {
            setSpinner(true);
          }}
        >
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
              {spinner ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Daftar"
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
          Sudah punya Akun?
          <Link to={`/login`} className="mx-2 text-green-900 hover:underline">
            Masuk disini
          </Link>
        </p>
      </Stack>
    </Box>
  );
}
