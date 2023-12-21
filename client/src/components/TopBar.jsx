import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AppsIcon from "../utils/AppsIcon";
import { useLocation } from "react-router-dom";

export default () => {
  const location = useLocation();
  const [page, setPage] = React.useState("home");

  React.useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const key = pathSegments[3];

    setPage(key || "home");
  }, [location.pathname]);
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Container maxWidth="2xl">
        <Toolbar disableGutters>
          <AppsIcon />
          <Avatar sx={{ display: page === "profile" ? "none" : "" }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
