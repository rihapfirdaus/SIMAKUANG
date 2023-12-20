import { useEffect } from "react";
import {
  Box,
  Snackbar,
  Button,
  CircularProgress,
  FormControl,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import DateField from "../components/DateField";
import SelectField from "../components/SelectField";
import TextSelectField from "../components/TextSelectField";
import StringField from "../components/StringField";
import AreaField from "../components/AreaField";
import CurrencyField from "../components/CurrencyField";

import axios from "axios";
import moment from "moment";

export async function loader({ params }) {
  const uid = params?.userId;
  const id = params?.id;
  const type = params?.type;

  try {
    const response = await axios.get(
      `https://saldo-siaga-api.vercel.app/user/${uid}/${type}/id/${id}`
    );

    let data;
    switch (type) {
      case "expense":
        data = response.data.expense;
        break;
      case "income":
        data = response.data.income;
        break;
      case "debt":
        data = response.data.debt;
        break;
      case "saving":
        data = response.data.saving;
        break;
    }
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { error };
  }
}
export async function action({ request, params }) {
  const uid = params?.userId;
  const id = params?.id;
  const type = params?.type;

  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    let requestBody;

    const amount = updates.amount;
    const note = updates.note;

    if (type === "debt") {
      const debtor = updates.debtor;
      const creditor = updates.creditor;
      const date =
        moment(updates.startDate, "DD/MM/YYYY").format("YYYY-MM-DD") ||
        new Date();
      const dueDate =
        moment(updates.endDate, "DD/MM/YYYY").format("YYYY-MM-DD") ||
        new Date();

      requestBody = {
        debtor,
        creditor,
        amount,
        category,
        date,
        dueDate,
        note,
      };
    } else {
      const category = updates.category;
      const date =
        moment(updates.date, "DD/MM/YYYY").format("YYYY-MM-DD") || new Date();

      requestBody = {
        amount,
        category,
        date,
        note,
      };
    }
    const apiUrl = `https://saldo-siaga-api.vercel.app/user/${uid}/${type}/${id}`;
    await axios.put(apiUrl, requestBody);
    return { status: "201", message: "Data berhasil diubah" };
  } catch (error) {
    console.log(error);
    return {
      status: "404",
      message: "Data gagal diubah, Silahkan coba lagi.",
      error: error,
    };
  }
}
const formatType = (types) => {
  return types === "expense"
    ? "Pengeluaran"
    : types === "income"
    ? "Pemasukan"
    : types === "debt"
    ? "Pinjaman"
    : "Tabungan";
};
export default () => {
  const { userId, type } = useParams();

  const navigate = useNavigate();
  const data = useLoaderData();
  const status = useActionData() || "";
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(formatType(type));
  const [spinner, setSpinner] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dateline, setDateline] = useState(new Date());
  const [amount, setAmount] = useState(data.amount || "");
  const [debtor, setDebtor] = useState(data.debtor || "");
  const [creditor, setCreditor] = useState(data.creditor || "");
  const [notes, setNotes] = useState(data.notes || "");
  const [category, setCategory] = useState(data.category || "");

  const optionSavings = [
    { value: "increase", label: "Tabungan Masuk" },
    { value: "decrease", label: "Tabungan Keluar" },
  ];
  const categories = [
    { title: "food" },
    { title: "drink" },
    { title: "laundry" },
    { title: "breakfast" },
    { title: "lunch" },
    { title: "dinner" },
  ];
  useEffect(() => {
    if (Object.entries(status).length > 0) {
      setOpen(true);
      setSpinner(false);

      setTimeout(() => {
        console.log("harusnya", data);
        navigate(`/app/${userId}/notes/${type}`);
      }, 1500);
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
  const xxl = useMediaQuery(useTheme().breakpoints.up("xl"));
  const xl = useMediaQuery(useTheme().breakpoints.up("lg"));
  const lg = useMediaQuery(useTheme().breakpoints.up("md"));
  const md = useMediaQuery(useTheme().breakpoints.up("sm"));
  return (
    <>
      <Modal open={true}>
        <Box
          component={Form}
          method="post"
          onSubmit={() => {
            setSpinner(true);
          }}
          className="`border-2 p-4 rounded-3xl"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: xl ? 500 : 380,
            boxShadow: 24,
            bgcolor: "white",
            p: lg ? 4 : 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "darkgreen",
              mb: 4,
              textAlign: "center",
            }}
            children={`Ubah Catatan ${page}`}
          />
          <Stack spacing={2}>
            <FormControl>
              {type === "Pinjaman" ? (
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
                  options={optionSavings}
                  required
                />
              ) : (
                <TextSelectField
                  name="category"
                  label={`Tipe ${page}`}
                  value={category}
                  setValue={setCategory}
                  options={categories}
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
              sx={{ msTextOverflow: 2, p: 1.5 }}
            >
              {spinner ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Simpan"
              )}
            </Button>
            <Link
              to={`/app/${userId}/notes/${type}`}
              className="mx-2 text-red-600 hover:underline text-center"
            >
              Batal
            </Link>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1000}
        onClose={handleClose}
        message={status.message}
      />
    </>
  );
};
