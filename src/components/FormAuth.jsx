import React from "react";
import AppsIcon from "./AppsIcon";
import { Google } from "@mui/icons-material";
import { Link, Form } from "react-router-dom";
import { Divider, Box, Button, Stack } from "@mui/material";

export default function FormAuth({ label, formComp, message, linkLabel }) {
  const FormComp = formComp;
  return (
    <Box className="form-container">
      <Stack className="form-auth">
        <AppsIcon />
        <h1>{label}</h1>
        <FormComp />
        <p>
          {message}
          <Link
            to={label == "Log in" ? `/signup` : `/login`}
            style={{ color: "darkgreen", marginLeft: "5px" }}
          >
            {linkLabel}
          </Link>
        </p>
        <Divider>or</Divider>
        <Form>
          <Button
            variant="outlined"
            startIcon={<Google color="success" />}
            color="success"
            sx={{ my: 2, p: 1.5 }}
          >
            {label} with Google
          </Button>
        </Form>
      </Stack>
    </Box>
  );
}
