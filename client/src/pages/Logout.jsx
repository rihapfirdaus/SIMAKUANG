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

import { LogoutRounded } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export async function action() {
  try {
    signOut(auth);
    return { status: "success", message: "Anda telah logout.." };
  } catch (error) {
    return {
      status: "fail",
      message: "Logout tidak berhasil, Silahkan Coba Lagi",
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

      status.status === "success"
        ? setTimeout(() => {
            navigate(`/`);
          }, 1500)
        : setTimeout(() => {
            navigate(`/app/${userId}/profile`);
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
          <Typography
            sx={{
              mb: 4,
              textAlign: "center",
            }}
          >
            <LogoutRounded color="success" sx={{ fontSize: "64px" }} />
            <p className="text-2xl text-green-800 font-bold">Log Out?</p>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              size="small"
              variant="outlined"
              color="error"
              LinkComponent={Link}
              to={`/app/${userId}/profile`}
              sx={{
                msTextOverflow: 2,
                p: 1.5,
              }}
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="small"
              variant="outlined"
              color="success"
              sx={{
                msTextOverflow: 2,
                p: 1.5,
              }}
            >
              {spinner ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Yakin"
              )}
            </Button>
          </Box>
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
