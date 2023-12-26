import React, { useState, useEffect } from "react";
import { Link, Form, useActionData, useNavigate } from "react-router-dom";

import { Alert, Stack, Button, Box, CircularProgress } from "@mui/material";
import { INVALID_ACCOUNT_ERROR } from "../utils/Strings";
import axios from "axios";
import AppsIcon from "../utils/AppsIcon";
import EmailField from "../components/EmailField";

export async function action({ request }) {
  const baseUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  const email = updates.email;
  const password = updates.password;

  try {
    const response = await axios.get(`${baseUrl}/user/${email}`);
    const user = response.data;
    return { status: "200", message: "Login Berhasil", userId };
  } catch (error) {
    return { status: "404", message: INVALID_ACCOUNT_ERROR, error };
  }
}

export default () => {
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
        <p className="mt-4 py-4">Cari akun anda dengan email</p>
        <Form
          method="post"
          onSubmit={() => {
            setSpinner(true);
          }}
        >
          <Stack spacing={1.5}>
            <Stack spacing={0.25}>
              <EmailField value={email} setValue={setEmail} />
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
                  "Cari Akun"
                )}
              </Button>

              {/* <PasswordField
                name="password"
                label="Password"
                value={password}
                setValue={setPassword}
              /> */}
            </Stack>

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
};
