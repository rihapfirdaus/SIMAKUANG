import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AppsIcon from "../utils/AppsIcon";

export default () => {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Container maxWidth="2xl">
        <Toolbar disableGutters>
          <AppsIcon />
          <Avatar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
