import React, { useState } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import AppsIcon from "../utils/AppsIcon";
import axios from "axios";
import { TextField, Stack, Box } from "@mui/material";

export async function action({ request }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email);
  const error = emailValidation ? "" : "Masukkan email yang valid";

  if (error === "") {
    try {
      // Menggunakan axios untuk mendapatkan data pengguna
      const userResponse = await axios.get(
        `https://saldo-siaga-api.vercel.app//${updates.email}`
      );
      const user = userResponse.data; // Mengambil data dari respons

      console.log(user);

      // Redirect ke halaman yang sesuai
      redirect("/");
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "Terjadi kesalahan saat mengambil data pengguna";
    }
  } else {
    return error;
  }
  // return error === "" ? redirect("/") : error;
}

export default function AuthPage() {
  const [email, setEmail] = useState("");

  const error = useActionData();
  return (
    <Box className="form-container">
      <Stack className="form-auth">
        <AppsIcon />
        <Form method="post" noValidate>
          <Stack spacing={2}>
            <TextField
              error={!error == "" ? true : false}
              helperText={error}
              label="Masukkan Email Anda"
              type="email"
              color="success"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Stack>
        </Form>
      </Stack>
    </Box>
  );
}
