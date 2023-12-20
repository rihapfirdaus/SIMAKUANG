import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

export default ({ title, dataset, datakey, series, showLabel }) => {
  return (
    <>
      {title && <Typography>{title}</Typography>}
      <LineChart
        colors={["lightgreen", "darkgreen"]}
        height={300}
        dataset={dataset}
        series={series}
        xAxis={[{ scaleType: "point", dataKey: datakey }]}
        slotProps={{
          legend: { hidden: showLabel ? false : true },
        }}
      />
    </>
  );
};
