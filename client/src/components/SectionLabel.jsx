import React from "react";
import { Typography } from "@mui/material";

export default ({ label, isCenter, className }) => {
  return (
    <Typography
      className={`${isCenter ? "text-center" : "text-start"} ${
        className || ""
      }`}
      sx={{ fontWeight: "bold", color: "darkgreen" }}
    >
      {label}
    </Typography>
  );
};
