import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import * as React from "react";
import { Typography } from "@mui/material";

export default ({ title, data, showLabel }) => {
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };
  return (
    <>
      {title && <Typography>{title}</Typography>}
      <PieChart
        series={[
          {
            data,
            arcLabel: getArcLabel,
            cornerRadius: 5,
            paddingAngle: 2,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
          },
        ]}
        height={200}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: 14,
            userSelect: "none",
          },
        }}
        slotProps={{
          legend: { hidden: showLabel ? false : true },
        }}
      />
    </>
  );
};
