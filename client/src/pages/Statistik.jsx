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
import Recap from "../components/Recap";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export async function loader({ params }) {
  const baseUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const thisYear = today.getFullYear();

  const uid = params?.userId;

  try {
    const apiUrls = [
      `${baseUrl}/user/${uid}/expense/total?year=${thisYear}`,
      `${baseUrl}/user/${uid}/expense/total?year=${thisYear}&month=${thisMonth}`,
      `${baseUrl}/user/${uid}/expense/category?year=${thisYear}&month=${thisMonth}`,
      `${baseUrl}/user/${uid}/expense/total/all/months`,
      `${baseUrl}/user/${uid}/income/total?year=${thisYear}`,
      `${baseUrl}/user/${uid}/income/total?year=${thisYear}&month=${thisMonth}`,
      `${baseUrl}/user/${uid}/income/category?year=${thisYear}&month=${thisMonth}`,
      `${baseUrl}/user/${uid}/income/total/all/months`,
      `${baseUrl}/user/${uid}/debt/total?year=${thisYear}`,
      `${baseUrl}/user/${uid}/debt/total?year=${thisYear}&month=${thisMonth}`,
      `${baseUrl}/user/${uid}/debt/category?year=${thisYear}&month=${thisMonth}`,
      `${baseUrl}/user/${uid}/debt/total/all/months`,
      `${baseUrl}/user/${uid}/saving/total?year=${thisYear}`,
      `${baseUrl}/user/${uid}/saving/total?year=${thisYear}&category=decrease`,
      `${baseUrl}/user/${uid}/saving/total?year=${thisYear}&category=increase`,
      `${baseUrl}/user/${uid}/saving/total?year=${thisYear}&month=${thisMonth}`,
      `${baseUrl}/user/${uid}/saving/category?year=${thisYear}&month=${thisMonth}`,
      `${baseUrl}/user/${uid}/saving/total/all/months`,
    ];

    const [
      expenseByYear,
      expenseByMonth,
      expenseByCategory,
      expenseMonthly,
      incomeByYear,
      incomeByMonth,
      incomeByCategory,
      incomeMonthly,
      debtByYear,
      debtByMonth,
      debtByCategory,
      debtMonthly,
      savingByYear,
      savingByDecrease,
      savingByIncrease,
      savingByMonth,
      savingByCategory,
      savingMonthly,
    ] = await Promise.all(apiUrls.map((url) => axios.get(url)));

    const expensesByYear = expenseByYear.data.expense;
    const expensesByMonth = expenseByMonth.data.expense;
    const expensesByCategory = expenseByCategory.data;
    const expensesMonthly = expenseMonthly.data.monthlyExpenses;
    const incomesByYear = incomeByYear.data.income;
    const incomesByMonth = incomeByMonth.data.income;
    const incomesByCategory = incomeByCategory.data;
    const incomesMonthly = incomeMonthly.data.monthlyIncomes;
    const debtsByYear = debtByYear.data.debt;
    const debtsByMonth = debtByMonth.data.debt;
    const debtsByCategory = debtByCategory.data;
    const debtsMonthly = debtMonthly.data.monthlyDebts;
    const savingsByYear = savingByYear.data.saving;
    const savingsByDecrease = savingByDecrease.data.saving;
    const savingsByIncrease = savingByIncrease.data.saving;
    const savingsByMonth = savingByMonth.data.saving;
    const savingsByCategory = savingByCategory.data;
    const savingsMonthly = savingMonthly.data.monthlySavings;

    return {
      expensesByYear,
      expensesByMonth,
      expensesByCategory,
      expensesMonthly,
      incomesByYear,
      incomesByMonth,
      incomesByCategory,
      incomesMonthly,
      debtsByYear,
      debtsByMonth,
      debtsByCategory,
      debtsMonthly,
      savingsByYear,
      savingsByDecrease,
      savingsByIncrease,
      savingsByMonth,
      savingsByCategory,
      savingsMonthly,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export default () => {
  const {
    expensesByYear,
    expensesByMonth,
    expensesByCategory,
    expensesMonthly,
    incomesByYear,
    incomesByMonth,
    incomesByCategory,
    incomesMonthly,
    debtsByYear,
    debtsByMonth,
    debtsByCategory,
    debtsMonthly,
    savingsByYear,
    savingsByDecrease,
    savingsByIncrease,
    savingsByMonth,
    savingsByCategory,
    savingsMonthly,
  } = useLoaderData();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        <AccordionDetails className="grid lg:grid-cols-2 gap-4">
          <Statistics
            label="Pengeluaran"
            labelrecap1="Total Pengeluaran Tahun ini"
            recap1={expensesByYear}
            labelrecap2="Total Pengeluaran Bulan Ini"
            recap2={expensesByMonth}
            pie={expensesByCategory}
            bar={expensesMonthly}
          />
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
        <AccordionDetails className="grid lg:grid-cols-2 gap-4">
          <Statistics
            label="Pemasukan"
            labelrecap1="Total Pemasukan Tahun ini"
            recap1={incomesByYear}
            labelrecap2="Total Pemasukan Bulan Ini"
            recap2={incomesByMonth}
            pie={incomesByCategory}
            bar={incomesMonthly}
          />
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
        <AccordionDetails className="grid lg:grid-cols-2 gap-4">
          <Statistics
            label="Tabungan"
            labelrecap1="Total Tabungan Masuk"
            recap1={savingsByIncrease}
            labelrecap2="Total Tabungan Keluar"
            recap2={savingsByDecrease}
            pie={savingsByCategory}
            bar={savingsMonthly}
          />
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
        <AccordionDetails className="grid lg:grid-cols-2 gap-4">
          <Statistics
            label="Pinjaman"
            labelrecap1="Total Pinjaman Masuk"
            recap1={debtsByYear}
            labelrecap2="Total Pinjaman Keluar"
            recap2={debtsByMonth}
            pie={debtsByCategory}
            bar={debtsMonthly}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const Statistics = ({
  label,
  pie,
  bar,
  labelrecap1,
  labelrecap2,
  recap1,
  recap2,
}) => {
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
  const TOTAL = pie.map((item) => item.count).reduce((a, b) => a + b, 0);

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
      <Recap label={labelrecap1} number={recap1} />
      <Recap label={labelrecap2} number={recap2} />
      <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl ">
        <SectionLabel label={`Kategori ${label}`} isCenter />
        {pie.length !== 0 ? (
          <PieChart
            series={[
              {
                data: pie.map((item) => ({
                  label: item._id,
                  value: item.count,
                })),
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
        ) : (
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            height={300}
            children="Anda tidak memiliki data"
          />
        )}
      </Box>
      <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl">
        <SectionLabel label={`${label} ${new Date().getFullYear()}`} isCenter />

        <BarChart
          dataset={bar}
          xAxis={[{ scaleType: "band", data: xLabels }]}
          series={[{ dataKey: "total", label: label }]}
          {...chartSetting}
          margin={{
            left: 55,
          }}
        />
      </Box>
    </>
  );
};
