import { Typography } from "@mui/material";
import React from "react";
import SectionLabel from "./SectionLabel";

export default ({ label, number }) => {
  return (
    <div className="my-4">
      <SectionLabel label={label} isCenter />
      <div className="flex items-stretch justify-between border-2 px-4 py-8 rounded-3xl">
        <p className="self-start">Rp.</p>
        <h1 className="text-5xl text-end">{number || "0"}</h1>
        <p className="self-end">,00</p>
      </div>
    </div>
  );
};
