import React from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Recap from "../components/Recap";
import { LineChart } from "@mui/x-charts/LineChart";
import SectionLabel from "../components/SectionLabel";
import axios from "axios";

export async function loader({ params }) {
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const thisYear = today.getFullYear();

  const uid = params?.userId;
  try {
    const apiUrls = [
      `https://saldo-siaga-api.vercel.app/user/${uid}/income/total`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/expense/total`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/income/total?year=${thisYear}&month=${thisMonth}`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/expense/total?year=${thisYear}&month=${thisMonth}`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/saving/total`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/debt/total`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/income/total/all/months`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/expense/total/all/months`,
    ];

    const [
      allIncome,
      allExpense,
      income,
      expense,
      saving,
      debt,
      dataIncomes,
      dataExpenses,
    ] = await Promise.all(apiUrls.map((url) => axios.get(url)));

    const totals = allIncome.data.income - allExpense.data.expense;
    const totalIncomes = income.data.income;
    const totalExpenses = expense.data.expense;
    const totalSaving = saving.data.saving;
    const totalDebt = debt.data.debt;
    const incomes = dataIncomes.data.monthlyIncomes;
    const expenses = dataExpenses.data.monthlyExpenses;

    return {
      totals,
      totalIncomes,
      totalExpenses,
      totalSaving,
      totalDebt,
      incomes,
      expenses,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

export default function Home() {
  const { user } = useRouteLoaderData("root");
  const {
    incomes,
    expenses,
    totals,
    totalIncomes,
    totalExpenses,
    totalSaving,
    totalDebt,
  } = useLoaderData();

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

  const dataset = incomes.map((income, index) => ({
    month: income.month,
    incomes: income.total,
    expenses: expenses[index].total,
  }));
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
          <Recap label="Saldo" number={totals} />
          <Recap label="Pemasukan Bulan Ini" number={totalIncomes} />
          <Recap label="Pengeluaran Bulan Ini" number={totalExpenses} />
          <Recap label="Jumlah Tabungan" number={totalSaving} />
          <Recap label="Jumlah Pinjaman" number={totalDebt} />
        </Carousel>
      </Box>
      <SectionLabel label="Statistik Keuangan" isCenter />
      <Box className="border-2 p-2 rounded-3xl">
        <LineChart
          colors={["lightgreen", "darkgreen"]}
          height={300}
          dataset={dataset}
          series={[
            { dataKey: "incomes", label: "pemasukan" },
            { dataKey: "expenses", label: "pengeluaran" },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: xLabels,
            },
          ]}
        />
      </Box>
    </div>
  );
}
