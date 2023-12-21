import {
  DisplaySettings,
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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, Outlet, useParams, useRouteLoaderData } from "react-router-dom";

export default () => {
  const { user } = useRouteLoaderData("root");
  const { userId } = useParams();
  return (
    <div className="px-4">
      <div className="p-4">
        <div className="flex flex-col items-center">
          <Avatar sx={{ width: "8rem", height: "8rem" }} />
          <div className="mx-4 text-center m-2">
            <Typography variant="h4">{user.displayName}</Typography>
            <Typography>{user.email}</Typography>
            <Button color="success">Edit Profil</Button>
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
