import {
  DeleteForeverOutlined,
  FormatPaint,
  Help,
  Logout,
  RateReview,
  Security,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import {
  Link,
  Form,
  Outlet,
  useParams,
  useSearchParams,
  useLoaderData,
  useNavigate,
  useActionData,
} from "react-router-dom";
import { useEffect, useState } from "react";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
import StringField from "../components/StringField";
import SelectField from "../components/SelectField";
import DateField from "../components/DateField";
import AreaField from "../components/AreaField";
import axios from "axios";
import moment from "moment";

export async function loader({ params }) {
  const baseUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
  const uid = params?.userId;

  try {
    const apiUrl = `${baseUrl}/user/id/${uid}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function action({ request, params }) {
  const baseUrl = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
  const uid = params?.userId;

  try {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    let requestBody;

    const photoURL = updates.photoUrl;
    const displayName = updates.displayName;
    const firstName = updates.firstName;
    const lastName = updates.lastName;
    const birthdate = updates.birthdate
      ? moment(updates.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD")
      : "";
    const gender = updates.gender;
    const address = updates.address;

    requestBody = {
      photoURL,
      displayName,
      firstName,
      lastName,
      birthdate,
      gender,
      address,
    };

    const apiUrl = `${baseUrl}/user/${uid}`;
    await axios.patch(apiUrl, requestBody);
    return { status: "201", message: "Profil berhasil diubah" };
  } catch (error) {
    return {
      status: "404",
      message: "Profil gagal diubah, Silahkan coba lagi.",
      error: error,
    };
  }
}

export default () => {
  const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUDNAME;
  const uploadPreset = import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOADPRESET;

  const user = useLoaderData();
  const navigate = useNavigate();
  const status = useActionData() || "";
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const { userId } = useParams();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(user.email || "");
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [gender, setGender] = useState(user.gender || "Undefined");
  const [birthdate, setBirthdate] = useState(user.birthdate || "");
  const [address, setAddress] = useState(user.address || "");
  const [profileImage, setProfileImage] = useState(user.photoURL || "");

  const [currentImage, setCurrentImage] = useState("");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    cropping: true,
    croppingAspectRatio: 1,
    showSkipCropButton: false,
    client_allowed_formats: ["jpg", "jpeg", "png", "svg"],
    multiple: false,
    croppingShowBackButton: true,
    croppingShowDimensions: true,
    croppingDefaultSelectionRatio: 1,
    sources: ["local"],
    maxImageFileSize: 2000000,
  });

  useEffect(() => {
    if (Object.entries(status).length > 0) {
      setOpen(true);
      setSpinner(false);

      setTimeout(() => {
        navigate(`/app/${userId}/profile`);
      }, 1500);
    }
  }, [status]);

  useEffect(() => {
    if (currentImage) {
      setProfileImage(currentImage);
    }
  }, [currentImage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return searchParams.size > 0 && searchParams.get("edit") ? (
    <>
      <div className="px-4 flex flex-col justify-center items-center">
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "darkgreen",
            textAlign: "center",
            mb: 2,
          }}
        >
          Edit Foto Profil
        </Typography>

        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <Avatar
            src={profileImage}
            sx={{
              width: "8rem",
              height: "8rem",
            }}
            imgProps={{ draggable: "false" }}
          />

          <Stack spacing={2} direction="row">
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setImage={setCurrentImage}
            />
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                setProfileImage("");
              }}
            >
              <DeleteForeverOutlined />
            </Button>
          </Stack>
        </Stack>

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "darkgreen",
            textAlign: "center",
            mt: 4,
          }}
        >
          Edit Biodata
        </Typography>
        <Stack
          component={Form}
          method="post"
          spacing={2}
          maxWidth="600px"
          className="lg:w-3/4 mx-4"
          onSubmit={() => {
            setSpinner(true);
          }}
        >
          <input
            hidden
            type="text"
            name="photoUrl"
            value={profileImage}
            onChange={(event) => setProfileImage(event.target.value)}
          />
          <StringField
            label="Email"
            name="email"
            value={email}
            setValue={setEmail}
            disabled
          />
          <StringField
            label="Nama Tampilan"
            name="displayName"
            value={displayName}
            setValue={setDisplayName}
            required
          />
          <Stack direction="row" spacing={2}>
            <StringField
              label="Nama Depan"
              name="firstName"
              value={firstName}
              setValue={setFirstName}
            />
            <StringField
              label="Nama Belakang"
              name="lastName"
              value={lastName}
              setValue={setLastName}
            />
          </Stack>
          <DateField
            label="Tanggal Lahir"
            name="birthdate"
            value={birthdate}
            setValue={setBirthdate}
          />
          <FormControl>
            <SelectField
              label="Jenis Kelamin"
              name="gender"
              value={gender}
              setValue={setGender}
              options={[
                { value: "Laki-laki", label: "Laki-laki" },
                { value: "Perempuan", label: "Perempuan" },
                { value: "Undefined", label: "Tidak ingin memberi tahu" },
              ]}
            />
          </FormControl>
          <AreaField
            label="Alamat"
            name="address"
            value={address}
            setValue={setAddress}
          />
          <Stack direction="row" justifyContent="end" spacing={2}>
            <Button type="submit" variant="contained" color="success">
              {spinner ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Simpan"
              )}
            </Button>
            <Button
              variant="contained"
              color="error"
              LinkComponent={Link}
              to={`/app/${userId}/profile`}
            >
              Batal
            </Button>
          </Stack>
        </Stack>
      </div>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1000}
        onClose={handleClose}
        message={status.message}
      />
    </>
  ) : (
    <div className="px-4">
      <div className="p-4">
        <div className="flex flex-col items-center">
          <Avatar src={user.photoURL} sx={{ width: "8rem", height: "8rem" }} />
          <div className="mx-4 text-center m-2">
            <Typography variant="h4">{user.displayName}</Typography>
            <Typography>{user.email}</Typography>
            <Button
              color="success"
              LinkComponent={Link}
              to={`/app/${userId}/profile?edit=true`}
            >
              Edit Profil
            </Button>
          </div>
        </div>
      </div>
      <Box>
        <List className="border-2 px-4 rounded-3xl">
          <ListItemButton>
            <ListItemIcon>{<Security />}</ListItemIcon>
            <ListItemText
              primary="Keamanan"
              secondary={"Setel / Ubah Password untuk akun Anda"}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>{<FormatPaint />}</ListItemIcon>
            <ListItemText
              primary="Tema Aplikasi"
              secondary={"Sesuaikan tema dan bahasa"}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>{<RateReview />}</ListItemIcon>
            <ListItemText
              primary="Kritik dan Saran"
              secondary={"Laporkan masalah terkait aplikasi"}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>{<Help />}</ListItemIcon>
            <ListItemText
              primary="Bantuan"
              secondary={"Cari tahu bagaimana aplikasi dapat digunakan"}
            />
          </ListItemButton>
        </List>
      </Box>
      <Box className="my-2">
        <List className="border-2 px-4 rounded-3xl">
          <ListItemButton
            LinkComponent={Link}
            to={`/app/${userId}/profile/logout`}
          >
            <ListItemIcon>{<Logout />}</ListItemIcon>
            <ListItemText
              primary="Keluar"
              secondary={"Akan mengeluarkan anda dari sesi saat ini"}
            />
          </ListItemButton>
        </List>
      </Box>
      <Typography className="text-center">
        Made by <Link>RihapFirdaus</Link>
      </Typography>
      <Outlet />
    </div>
  );
};
