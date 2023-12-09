import { Box } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import SectionLabel from "../components/SectionLabel";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts";

export default () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const data = [
    { label: "Group A", value: 400, color: "#0088FE" },
    { label: "Group B", value: 300, color: "#00C49F" },
    { label: "Group C", value: 300, color: "#FFBB28" },
    { label: "Group D", value: 200, color: "#FF8042" },
  ];

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  const chartSetting = {
    height: 300,
    legend: { hidden: true },
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };
  return (
    <>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <SectionLabel label="Statistik Pengeluaran" />
        </AccordionSummary>
        <AccordionDetails>
          <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl mb-2">
            <Typography>Kategori Pengeluaran</Typography>

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
            />
          </Box>
          <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl">
            <Typography>Pengeluaran 2023</Typography>

            <BarChart
              xAxis={[{ scaleType: "band", data: xLabels }]}
              series={[{ data: income, label: "incomes" }]}
              {...chartSetting}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <SectionLabel label="Statistik Pemasukan" />
        </AccordionSummary>
        <AccordionDetails>
          <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl mb-2">
            <div className="w-full flex justify-between">
              <Typography>Jumlah pemasukan bulan ini</Typography>
              <Typography>100000</Typography>
            </div>
            <div className="w-full flex justify-between">
              <Typography>Jumlah uang yang terpakai bulan ini</Typography>
              <Typography>100000</Typography>
            </div>
          </Box>
          <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl">
            <Typography>Pemasukan 2023</Typography>
            <BarChart
              xAxis={[{ scaleType: "band", data: xLabels }]}
              series={[{ data: income, label: "incomes" }]}
              {...chartSetting}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <SectionLabel label="Statistik Tabungan" />
        </AccordionSummary>
        <AccordionDetails>
          <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl">
            <Typography>Tabungan 2023</Typography>

            <LineChart
              colors={["lightgreen", "darkgreen"]}
              height={300}
              series={[{ data: income, label: "incomes" }]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              slotProps={{
                legend: { hidden: true },
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <SectionLabel label="Statistik Pinjaman" />
        </AccordionSummary>
        <AccordionDetails>
          <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl">
            <Typography>Pinjaman 2023</Typography>

            <LineChart
              colors={["lightgreen", "darkgreen"]}
              height={300}
              series={[{ data: income, label: "incomes" }]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              slotProps={{
                legend: { hidden: true },
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

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
const income = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 3490,
];
