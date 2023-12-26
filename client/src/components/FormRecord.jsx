import React, { useState, useEffect } from "react";
import { Form, useActionData, useLocation, useParams } from "react-router-dom";
import {
  Snackbar,
  Stack,
  Button,
  FormControl,
  Typography,
  CircularProgress,
} from "@mui/material";
import SelectField from "./SelectField";
import TextSelectField from "./TextSelectField";
import StringField from "./StringField";
import AreaField from "./AreaField";
import CurrencyField from "./CurrencyField";
import DateField from "./DateField";

const formatType = (types) => {
  return types === "expense"
    ? "Pengeluaran"
    : types === "income"
    ? "Pemasukan"
    : types === "debt"
    ? "Pinjaman"
    : "Tabungan";
};

export default ({ action, className }) => {
  const status = useActionData() || "";
  const [open, setOpen] = useState(false);

  const { type } = useParams();

  const [page, setPage] = useState(formatType(type));
  const [spinner, setSpinner] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dateline, setDateline] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [debtor, setDebtor] = useState("");
  const [creditor, setCreditor] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [savingType, setSavingType] = useState("increase");

  useEffect(() => {
    if (Object.entries(status).length > 0) {
      setOpen(true);
      setSpinner(false);
      setDate(new Date());
      setDateline(new Date());
      setAmount("");
      setDebtor("");
      setCreditor("");
      setNotes("");
      setCategory("");
      setSavingType("increase");
    }
  }, [status]);

  useEffect(() => {
    setPage(formatType(type));
  }, [type]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Form
        action={action}
        method="post"
        onSubmit={() => {
          setSpinner(true);
        }}
        className={`border-2 p-4 rounded-3xl  ${className}`}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "darkgreen",
            mb: 4,
            textAlign: "center",
          }}
          children={`Tambah Catatan ${page}`}
        />
        <Stack spacing={2}>
          <FormControl>
            {type === "debt" ? (
              <Stack direction="row" spacing={2}>
                <DateField
                  name="startDate"
                  label={`Tanggal ${page}`}
                  value={date}
                  setValue={setDate}
                />
                <DateField
                  name="endDate"
                  label="Tenggat"
                  value={dateline}
                  setValue={setDateline}
                  isDateline={true}
                />
              </Stack>
            ) : (
              <DateField
                name="date"
                label={`Tanggal ${page}`}
                value={date}
                setValue={setDate}
              />
            )}
          </FormControl>

          <FormControl>
            <CurrencyField
              name="amount"
              label={`Jumlah ${page}`}
              value={amount}
              setValue={setAmount}
              required
            />
          </FormControl>

          <FormControl>
            {type === "debt" ? (
              <Stack direction="row" spacing={2}>
                <StringField
                  name="debtor"
                  label="Penerima Pinjaman"
                  value={debtor}
                  setValue={setDebtor}
                  required
                />
                <StringField
                  name="creditor"
                  label="Pemberi Pinjaman"
                  value={creditor}
                  setValue={setCreditor}
                  required
                />
              </Stack>
            ) : type === "saving" ? (
              <SelectField
                name="category"
                label={`Tipe ${page}`}
                value={savingType}
                setValue={setSavingType}
                options={[
                  { value: "increase", label: "Tabungan Masuk" },
                  { value: "decrease", label: "Tabungan Keluar" },
                ]}
              />
            ) : (
              <TextSelectField
                name="category"
                label={`Tipe ${page}`}
                value={category}
                setValue={setCategory}
                options={[]}
              />
            )}
          </FormControl>

          <FormControl>
            <AreaField
              name="note"
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
            sx={{ my: 2, p: 1.5 }}
          >
            {spinner ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Tambah Catatan"
            )}
          </Button>
        </Stack>
      </Form>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
        message={status.message}
      />
    </>
  );
};
