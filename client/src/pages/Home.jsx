import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Recap from "../components/Recap";
import { LineChart } from "@mui/x-charts/LineChart";
import SectionLabel from "../components/SectionLabel";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function Home() {
  const { user } = useRouteLoaderData("root");

  const income = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 3490,
  ];
  const expense = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800,
  ];
  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  return (
    <div className="px-4">
      <Box className="my-24 text-center">
        <Typography variant="h4">Hai, {user.displayName}</Typography>
        <Typography variant="p">bagaimana kabar kamu hari ini?</Typography>
      </Box>
      <Box>
        <Carousel
          animation="slide"
          stopAutoPlayOnHover
          navButtonsAlwaysInvisible
          indicatorContainerProps={{
            style: {
              marginTop: "16px",
            },
          }}
        >
          <Recap label="Saldo" number="20000" />
          <Recap label="Pemasukan Bulan Ini" number="2000" />
          <Recap label="Pengeluaran Bulan Ini" number="100000" />
          <Recap label="Selisih Saldo" number="5000" />
        </Carousel>
      </Box>
      <SectionLabel label="Statistik Keuangan" isCenter />
      <Box className="border-2 p-2 rounded-3xl">
        <LineChart
          colors={["lightgreen", "darkgreen"]}
          height={300}
          series={[
            { data: income, label: "incomes" },
            { data: expense, label: "expenses" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </Box>
    </div>
  );
}
