import * as React from "react";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

export default ({ title, dataset, datakey, series, showLabel }) => {
  return (
    <>
      {title && <Typography>{title}</Typography>}
      <BarChart
        height={300}
        dataset={dataset}
        series={series}
        xAxis={[{ scaleType: "band", dataKey: datakey }]}
        slotProps={{
          legend: { hidden: showLabel ? false : true },
        }}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-20px, 0)",
          },
        }}
      />
    </>
  );
};
