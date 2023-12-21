import { Typography } from "@mui/material";
import React from "react";

export default ({ label, number, className }) => {
  const currencyFormatter = new Intl.NumberFormat("in-IN", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    compactDisplay: "short",
  });
  return (
    <div className={` ${className} border-2 rounded-3xl p-4`}>
      <Typography
        sx={{
          fontWeight: "bold",
          color: "darkgreen",
          mb: 2,
          textAlign: "center",
        }}
        children={label}
      />
      <h1 className="text-4xl text-center">
        {currencyFormatter.format(number || 0)}
      </h1>
    </div>
  );
};
