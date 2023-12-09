import React from "react";
import { Typography } from "@mui/material";

export default ({ label, isCenter }) => {
  return (
    <Typography
      className={isCenter ? "text-center" : "text-start"}
      sx={{ fontWeight: "bold", color: "darkgreen", mt: 2, mb: 1 }}
    >
      {label}
    </Typography>
  );
};
