import { useEffect } from "react";
import {
  Box,
  Snackbar,
  Button,
  CircularProgress,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";
import { CloseRounded, ErrorOutlineRounded } from "@mui/icons-material";

export async function action({ params }) {
  const baseUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
  const uid = params?.userId;
  const id = params?.id;
  const type = params?.type;

  try {
    const apiUrl = `${baseUrl}/user/${uid}/${type}/${id}`;
    await axios.delete(apiUrl);
    return { status: "201", message: "Data berhasil dihapus" };
  } catch (error) {
    return {
      status: "404",
      message: "Data gagal dihapus, Silahkan coba lagi.",
      error: error,
    };
  }
}
export default () => {
  const { userId, type } = useParams();

  const navigate = useNavigate();
  const data = useLoaderData();
  const status = useActionData() || "";
  const [open, setOpen] = useState(false);

  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (Object.entries(status).length > 0) {
      setOpen(true);
      setSpinner(false);

      setTimeout(() => {
        navigate(`/app/${userId}/notes/${type}`);
      }, 1500);
    }
  }, [status]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const xl = useMediaQuery(useTheme().breakpoints.up("lg"));
  const lg = useMediaQuery(useTheme().breakpoints.up("md"));
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
            boxShadow: 24,
            bgcolor: "white",
            width: 300,
            p: lg ? 4 : 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            type="submit"
            size="small"
            LinkComponent={Link}
            to={`/app/${userId}/notes/${type}`}
            color="inherit"
            sx={{
              msTextOverflow: 2,
              p: 1.5,
              position: "absolute",
              right: "0",
              top: "0",
            }}
          >
            <CloseRounded />
          </Button>

          <Typography
            sx={{
              mb: 4,
              textAlign: "center",
            }}
          >
            <ErrorOutlineRounded color="error" sx={{ fontSize: "64px" }} />
            <p className="text-2xl text-red-700 font-bold">Hapus data ini?</p>
            <p className="text-red-700">
              data yang dihapus tidak bisa dikembalikan
            </p>
          </Typography>
          <Button
            type="submit"
            size="small"
            variant="outlined"
            color="error"
            sx={{
              msTextOverflow: 2,
              p: 1.5,
            }}
          >
            {spinner ? <CircularProgress size={20} color="inherit" /> : "Hapus"}
          </Button>
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
