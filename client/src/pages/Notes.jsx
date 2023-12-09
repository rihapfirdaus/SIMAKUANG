import React, { useState } from "react";
import { Form } from "react-router-dom";
import {
  Stack,
  Button,
  FormControl,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SelectField from "../components/SelectField";
import TextSelectField from "../components/TextSelectField";
import StringField from "../components/StringField";
import AreaField from "../components/AreaField";
import CurrencyField from "../components/CurrencyField";
import DateField from "../components/DateField";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import SectionLabel from "../components/SectionLabel";
import { CreditCard, Savings, ShoppingCart, Wallet } from "@mui/icons-material";

export default () => {
  const [recordType, setRecordType] = useState("expenses");
  const [date, setDate] = useState(new Date());
  const [dateline, setDateline] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [debtor, setDebtor] = useState("");
  const [creditor, setCreditor] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [savingType, setSavingType] = useState("increase");

  const record =
    recordType === "expenses"
      ? "Pengeluaran"
      : recordType === "incomes"
      ? "Pemasukan"
      : recordType === "savings"
      ? "Tabungan"
      : "Pinjaman";

  const optionSavings = [
    { value: "increase", label: "Tabungan Masuk" },
    { value: "decrease", label: "Tabungan Keluar" },
  ];

  const optionRecords = [
    {
      value: "expenses",
      label: "Uang Keluar",
    },
    {
      value: "incomes",
      label: "Uang Masuk",
    },
    {
      value: "savings",
      label: "Tabungan",
    },
    {
      value: "debts",
      label: "Pinjaman",
    },
  ];
  const categories = [
    { title: "food" },
    { title: "drink" },
    { title: "laundry" },
    { title: "breakfast" },
    { title: "lunch" },
    { title: "dinner" },
  ];
  const dateFormatter = new Intl.DateTimeFormat("in-IN", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
  const currencyFormatter = new Intl.NumberFormat("in-IN", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="px-4">
      <SectionLabel label="Tambah Catatan" />
      <Form method="post" className="border-2 p-4 rounded-3xl">
        <Stack spacing={2}>
          <FormControl>
            <SelectField
              label="Tipe Catatan"
              value={recordType}
              setValue={setRecordType}
              options={optionRecords}
            />
          </FormControl>

          <FormControl>
            {recordType === "debts" ? (
              <Stack direction="row" spacing={2}>
                <DateField
                  label={`Tanggal ${record}`}
                  value={date}
                  setValue={setDate}
                />
                <DateField
                  label="Tenggat"
                  value={dateline}
                  setValue={setDateline}
                  isDateline={true}
                />
              </Stack>
            ) : (
              <DateField
                label={`Tanggal ${record}`}
                value={date}
                setValue={setDate}
              />
            )}
          </FormControl>

          <FormControl>
            <CurrencyField
              name="amount"
              label={`Jumlah ${record}`}
              value={amount}
              setValue={setAmount}
            />
          </FormControl>

          <FormControl>
            {recordType === "debts" ? (
              <Stack direction="row" spacing={2}>
                <StringField
                  name="debtor"
                  label="Penerima Pinjaman"
                  value={debtor}
                  setValue={setDebtor}
                />
                <StringField
                  name="creditor"
                  label="Pemberi Pinjaman"
                  value={creditor}
                  setValue={setCreditor}
                />
              </Stack>
            ) : recordType === "savings" ? (
              <SelectField
                label={`Tipe ${record}`}
                value={savingType}
                setValue={setSavingType}
                options={optionSavings}
              />
            ) : (
              <TextSelectField
                label={`Tipe ${record}`}
                value={category}
                setValue={setCategory}
                options={categories}
              />
            )}
          </FormControl>

          <FormControl>
            <AreaField
              name={notes}
              label="Deskripsi (opsional)"
              value={notes}
              setValue={setNotes}
            />
          </FormControl>

          <Button
            type="submit"
            size="small"
            variant="contained"
            color="success"
            onClick={() => {}}
            sx={{ my: 2, p: 1.5 }}
          >
            Tambah Catatan
          </Button>
        </Stack>
      </Form>
      <SectionLabel label="Lihat Catatan" />

      {/* <Box className="border-2  px-4 rounded-lg p-4" sx={{ height: 400 }}>
        <DataGrid
          getRowHeight={() => "auto"}
          columns={[
            {
              field: "date",
              headerName: "Tanggal",
              flex: 1,
              type: "date",
              valueFormatter: (params) =>
                dateFormatter.format(new Date(params.value)),
            },
            { field: "category", headerName: "Kategori", flex: 1 },
            {
              field: "amount",
              headerName: "Jumlah",
              flex: 1,
              type: "number",
              valueFormatter: ({ value }) => currencyFormatter.format(value),
              cellClassName: "font-tabular-nums",
            },
          ]}
          rows={row}
        />
      </Box> */}
      <Box>
        <List className="border-2 px-4 rounded-3xl">
          <ListItemButton>
            <ListItemIcon>{<Wallet />}</ListItemIcon>
            <ListItemText
              primary="Pemasukan"
              secondary={"Lacak uang yang masuk ke dompet Anda"}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>{<ShoppingCart />}</ListItemIcon>
            <ListItemText
              primary="Uang Keluar"
              secondary={"Lihat untuk apa uang Anda dihabiskan"}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>{<Savings />}</ListItemIcon>
            <ListItemText
              primary="Tabungan"
              secondary={"Kelola dan lihat tabungan Anda"}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>{<CreditCard />}</ListItemIcon>
            <ListItemText
              primary="Pinjaman"
              secondary={"Lihat Pinjaman yang Anda miliki/berikan"}
            />
          </ListItemButton>
        </List>
      </Box>
    </div>
  );
};

const row = [
  { id: "1", date: "2023-12-08", category: "Groceries", amount: 50.25 },
  { id: "2", date: "2023-12-09", category: "Electronics", amount: 120.75 },
  { id: "3", date: "2023-12-10", category: "Clothing", amount: 35.5 },
  { id: "4", date: "2023-12-11", category: "Home Decor", amount: 75.0 },
  { id: "5", date: "2023-12-12", category: "Books", amount: 22.9 },
  { id: "6", date: "2023-12-13", category: "Health", amount: 45.6 },
  { id: "7", date: "2023-12-14", category: "Sports", amount: 65.3 },
  { id: "8", date: "2023-12-15", category: "Toys", amount: 30.8 },
  { id: "9", date: "2023-12-16", category: "Stationery", amount: 15.75 },
  { id: "10", date: "2023-12-17", category: "Furniture", amount: 110.2 },
  { id: "11", date: "2023-12-18", category: "Beauty", amount: 40.5 },
  { id: "12", date: "2023-12-19", category: "Jewelry", amount: 90.75 },
  { id: "13", date: "2023-12-20", category: "Pet Supplies", amount: 25.4 },
  { id: "14", date: "2023-12-21", category: "Appliances", amount: 150.0 },
  { id: "15", date: "2023-12-22", category: "Music", amount: 18.25 },
  { id: "16", date: "2023-12-23", category: "Automotive", amount: 80.6 },
  { id: "17", date: "2023-12-24", category: "Movies", amount: 55.3 },
  { id: "18", date: "2023-12-25", category: "Electronics", amount: 120.0 },
  { id: "19", date: "2023-12-26", category: "Clothing", amount: 42.9 },
  { id: "20", date: "2023-12-27", category: "Books", amount: 28.6 },
  { id: "21", date: "2023-12-28", category: "Home Decor", amount: 95.75 },
  { id: "22", date: "2023-12-29", category: "Toys", amount: 50.2 },
  { id: "23", date: "2023-12-30", category: "Health", amount: 35.5 },
  { id: "24", date: "2023-12-31", category: "Sports", amount: 75.8 },
  { id: "25", date: "2024-01-01", category: "Stationery", amount: 20.25 },
  { id: "26", date: "2024-01-02", category: "Furniture", amount: 130.5 },
  { id: "27", date: "2024-01-03", category: "Beauty", amount: 48.75 },
  { id: "28", date: "2024-01-04", category: "Jewelry", amount: 85.4 },
  { id: "29", date: "2024-01-05", category: "Pet Supplies", amount: 32.0 },
  { id: "30", date: "2024-01-06", category: "Appliances", amount: 170.25 },
  { id: "31", date: "2024-01-07", category: "Music", amount: 25.6 },
  { id: "32", date: "2024-01-08", category: "Automotive", amount: 95.3 },
  { id: "33", date: "2024-01-09", category: "Movies", amount: 62.8 },
  { id: "34", date: "2024-01-10", category: "Electronics", amount: 110.0 },
  { id: "35", date: "2024-01-11", category: "Clothing", amount: 38.9 },
  { id: "36", date: "2024-01-12", category: "Books", amount: 20.6 },
  { id: "37", date: "2024-01-13", category: "Home Decor", amount: 85.75 },
  { id: "38", date: "2024-01-14", category: "Toys", amount: 40.2 },
  { id: "39", date: "2024-01-15", category: "Health", amount: 30.5 },
  { id: "40", date: "2024-01-16", category: "Sports", amount: 70.8 },
];
