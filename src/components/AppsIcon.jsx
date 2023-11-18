import React from "react";
import { Stack, Typography } from "@mui/material";
import icon from "../assets/img/icon.svg";

export default function AppsIcon() {
  return (
    <div className="apps-icon">
      <img src={icon} alt="IconApps" width="36px" />
      <h1>SaldoSiaga</h1>
    </div>
  );
}
