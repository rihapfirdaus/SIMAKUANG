import React from "react";
import { Stack, Typography } from "@mui/material";

export default function AppsIcon({ isCenter }) {
  return (
    <div
      className={`flex items-center w-full ${
        isCenter ? "justify-center" : "justify-start"
      }`}
    >
      <img src="/icon.svg" alt="IconApps" width="36px" draggable="false" />
      <Typography
        variant="h5"
        noWrap
        sx={{
          fontWeight: 700,
          color: "black",
          textDecoration: "none",
        }}
      >
        SaldoSiaga
      </Typography>
    </div>
  );
}
