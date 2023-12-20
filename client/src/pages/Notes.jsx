import React, { useEffect, useState } from "react";
import {
  Form,
  Link,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  Box,
  Button,
  LinearProgress,
  Modal,
  Snackbar,
  Stack,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DataGrid,
  GridFooterContainer,
  GridPagination,
  GridRowModes,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import axios from "axios";
import { LineChart } from "@mui/x-charts";
import { CreditCard, Savings, ShoppingCart, Wallet } from "@mui/icons-material";
import moment from "moment";
import FormRecord from "../components/FormRecord";

import Recap from "../components/Recap";
import SelectField from "../components/SelectField";
import DateField from "../components/DateField";
import SectionLabel from "../components/SectionLabel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { display } from "@mui/system";

export async function loader({ params }) {
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const thisYear = today.getFullYear();

  const uid = params?.userId;
  const type = params?.type;

  try {
    const apiUrls = [
      `https://saldo-siaga-api.vercel.app/user/${uid}/${type}`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/${type}/total`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/${type}/total?year=${thisYear}&month=${thisMonth}`,
      `https://saldo-siaga-api.vercel.app/user/${uid}/${type}/total/all/months`,
    ];

    const [allNote, totalNote, totalNoteByMonth, totalNoteEachMonth] =
      await Promise.all(apiUrls.map((url) => axios.get(url)));

    let notes;
    let total;
    let totalByMonth;
    let totalEachMonth;

    switch (type) {
      case "expense":
        notes = allNote.data.expenses;
        total = totalNote.data.expense;
        totalByMonth = totalNoteByMonth.data.expense;
        totalEachMonth = totalNoteEachMonth.data.monthlyExpenses;
        break;
      case "income":
        notes = allNote.data.incomes;
        total = totalNote.data.income;
        totalByMonth = totalNoteByMonth.data.income;
        totalEachMonth = totalNoteEachMonth.data.monthlyIncomes;
        break;
      case "debt":
        notes = allNote.data.debts;
        total = totalNote.data.debt;
        totalByMonth = totalNoteByMonth.data.debt;
        totalEachMonth = totalNoteEachMonth.data.monthlyDebts;
        break;
      case "saving":
        notes = allNote.data.savings;
        total = totalNote.data.saving;
        totalByMonth = totalNoteByMonth.data.saving;
        totalEachMonth = totalNoteEachMonth.data.monthlySavings;
        console.log(totalNoteEachMonth.data.monthlySavings);
        break;
    }

    return {
      notes,
      total,
      totalByMonth,
      totalEachMonth,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { error };
  }
}

export async function action({ request, params }) {
  const uid = params?.userId;
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
    const apiUrl = `https://saldo-siaga-api.vercel.app/user/${uid}/${type}`;
    await axios.post(apiUrl, requestBody);
    return { status: "201", message: "Data berhasil ditambahkan" };
  } catch (error) {
    return {
      status: "404",
      message: "Data gagal ditambahkan, Silahkan coba lagi.",
      error: error,
    };
  }
}

export default () => {
  const { userId, type } = useParams();
  const { notes, total, totalByMonth, totalEachMonth } = useLoaderData();
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState("month");
  const [loading, setLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [alert, setAlert] = React.useState("");
  const [show, setShow] = React.useState(false);

  const [data, setData] = React.useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    startDate: new Date(),
    endDate: new Date(),
  });

  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  useEffect(() => {
    setLoading(true);
    const getExpenses = async () => {
      try {
        let apiUrl;

        switch (option) {
          case "month":
            apiUrl = `https://saldo-siaga-api.vercel.app/user/${userId}/${type}?year=${
              data.year
            }&month=${data.month + 1}`;
            break;
          case "year":
            apiUrl = `https://saldo-siaga-api.vercel.app/user/${userId}/${type}?year=${data.year}`;
            break;
          case "period":
            apiUrl = `https://saldo-siaga-api.vercel.app/user/${userId}/${type}?startDate=${data.startDate}&endDate=${data.endDate}`;
            break;
          default:
            apiUrl = `https://saldo-siaga-api.vercel.app/user/${userId}/${type}`;
            break;
        }

        const response = await axios.get(apiUrl);
        switch (type) {
          case "expense":
            setRows(response.data.expenses);
            break;
          case "income":
            setRows(response.data.incomes);
            break;
          case "debt":
            setRows(response.data.debts);
            break;
          case "saving":
            setRows(response.data.savings);
            break;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getExpenses();
  }, [data, notes]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleHide = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShow(false);
  };
  const handleSubmit = () => {
    option === "month"
      ? setData({ month: month, year: year })
      : option === "year"
      ? setData({ year: year })
      : setData({ startDate: startDate, endDate: endDate });
    handleClose();
  };

  const columns = [
    {
      field: "date",
      headerName: "Tanggal",
      type: "date",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      editable: true,
      valueFormatter: (params) => dateFormatter.format(new Date(params.value)),
    },
    {
      field: "category",
      headerName: "Kategori",
      flex: 0.5,
      align: "left",
      editable: true,
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Jumlah",
      type: "number",
      headerAlign: "center",
      flex: 0.5,
      editable: true,
      valueFormatter: ({ value }) => currencyFormatter.format(value),
    },
    {
      field: "note",
      headerName: "Deskripsi",
      flex: 0.8,
      align: "left",
      editable: true,
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerAlign: "center",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            component={Link}
            to={`/app/${userId}/notes/${type}/update/${id}`}
            type="submit"
            label="Edit"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            component={Link}
            to={`/app/${userId}/notes/${type}/delete/${id}`}
            type="submit"
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
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
  const customToolbar = () => {
    return (
      <>
        <GridToolbarContainer sx={{ p: 2 }}>
          <SectionLabel
            label={
              option === "month"
                ? `Bulan ${monthYearFormatter.format(
                    new Date(data.year, data.month + 1, 0)
                  )}`
                : option === "year"
                ? `Tahun ${data.year}`
                : `${dateFormatter.format(
                    data.startDate
                  )} - ${dateFormatter.format(data.endDate)}`
            }
            className="flex justify-center content-center w-full"
          />
        </GridToolbarContainer>
        <GridToolbarContainer
          sx={{ display: "flex", justifyContent: "space-between", mx: 1 }}
        >
          <Button onClick={handleOpen}>Filter</Button>

          <GridToolbarQuickFilter />
        </GridToolbarContainer>
      </>
    );
  };

  const customFooter = () => {
    return (
      <GridFooterContainer sx={{ mx: 1 }}>
        <GridToolbarExport />
        <GridPagination />
      </GridFooterContainer>
    );
  };
  const xxl = useMediaQuery(useTheme().breakpoints.up("xl"));
  const xl = useMediaQuery(useTheme().breakpoints.up("lg"));
  const lg = useMediaQuery(useTheme().breakpoints.up("md"));
  const md = useMediaQuery(useTheme().breakpoints.up("sm"));

  return (
    <div className="p-4">
      <Box>
        <List
          className="flex border-2 rounded-3xl"
          sx={{
            "& .Mui-selected .MuiListItemIcon-root, .Mui-selected .MuiListItemText-root, .Mui-selected .MuiListItemText-primary, .Mui-selected .MuiListItemText-secondary":
              {
                color: "darkgreen",
                fontWeight: "bold",
              },
            "& .MuiListItemButton-root": {
              borderRadius: 4,
              mx: 1,
            },
            "& .MuiListItemIcon-root": {
              width: xl ? "" : "100%",
              display: "flex",
              justifyContent: "center",
            },
            "& .MuiListItemText-secondary": {
              display: xxl ? "block" : "none",
            },
            "& .MuiListItemText-root": {
              display: xl ? "block" : "none",
            },
          }}
        >
          <ListItemButton
            LinkComponent={Link}
            to={`/app/${userId}/notes/expense`}
            selected={type === "expense"}
          >
            <ListItemIcon>{<ShoppingCart />}</ListItemIcon>
            <ListItemText
              primary="Pengeluaran"
              secondary={"Lihat untuk apa uang Anda dihabiskan"}
            />
          </ListItemButton>
          <ListItemButton
            LinkComponent={Link}
            to={`/app/${userId}/notes/income`}
            selected={type === "income"}
          >
            <ListItemIcon>{<Wallet />}</ListItemIcon>
            <ListItemText
              primary="Pemasukan"
              secondary={"Lacak uang yang masuk ke dompet Anda"}
            />
          </ListItemButton>
          <ListItemButton
            LinkComponent={Link}
            to={`/app/${userId}/notes/saving`}
            selected={type === "saving"}
          >
            <ListItemIcon>{<Savings />}</ListItemIcon>
            <ListItemText
              primary="Tabungan"
              secondary={"Kelola dan lihat tabungan Anda"}
            />
          </ListItemButton>
          <ListItemButton
            LinkComponent={Link}
            to={`/app/${userId}/notes/debt`}
            selected={type === "debt"}
          >
            <ListItemIcon>{<CreditCard />}</ListItemIcon>
            <ListItemText
              primary="Pinjaman"
              secondary={"Lihat Pinjaman yang Anda miliki/berikan"}
            />
          </ListItemButton>
        </List>
      </Box>
      <Box className="lg:grid lg:grid-cols-3">
        <FormRecord className="lg:col-span-2 mt-4 lg:mr-4" />
        <Box className="hidden lg:block">
          <Recap label="Pemasukan Bulan Ini" number={totalByMonth} />
          <Box className="flex flex-col justify-center items-center border-2 p-4 rounded-3xl">
            <Typography
              sx={{
                fontWeight: "bold",
                color: "darkgreen",

                textAlign: "center",
              }}
              children="Statistik Tahun Ini"
            />

            <LineChart
              colors={["lightgreen", "darkgreen"]}
              height={300}
              dataset={totalEachMonth}
              series={[{ dataKey: "total", label: "pemasukan" }]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              slotProps={{
                legend: { hidden: true },
              }}
              margin={{
                left: 55,
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        className="mt-4"
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          editMode="row"
          slots={{
            toolbar: customToolbar,
            footer: customFooter,
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          disableDensitySelector
          autoPageSize
          sx={{
            borderRadius: 6,
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: "date", sort: "desc" }],
            },
          }}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={1}>
            <SelectField
              defaultValue={option}
              setValue={setOption}
              options={[
                { value: "month", label: "Bulan" },
                { value: "year", label: "Tahun" },
                { value: "periode", label: "Periode" },
              ]}
            />
            {option === "month" ? (
              <Stack direction="row" spacing={1}>
                <DateField value={month} setValue={setMonth} month />
                <DateField value={year} setValue={setYear} year />
              </Stack>
            ) : option === "year" ? (
              <DateField value={year} setValue={setYear} year />
            ) : (
              <Stack direction="row" spacing={1}>
                <DateField value={startDate} setValue={setStartDate} />
                <DateField value={endDate} setValue={setEndDate} />
              </Stack>
            )}
          </Stack>
          <Button onClick={handleSubmit}>Simpan</Button>
          <Button onClick={handleClose}>Batal</Button>
        </Box>
      </Modal>
      <Outlet></Outlet>
      <Snackbar
        open={show}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleHide}
        message={alert}
      />
    </div>
  );
};

const dateFormatter = new Intl.DateTimeFormat("in-IN", {
  day: "numeric",
  month: "short",
  year: "2-digit",
});
const currencyFormatter = new Intl.NumberFormat("in-IN", {
  style: "currency",
  currency: "IDR",
});
const monthYearFormatter = new Intl.DateTimeFormat("in-IN", {
  month: "long",
  year: "numeric",
});
