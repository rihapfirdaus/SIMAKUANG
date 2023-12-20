import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Drawer,
  Toolbar,
} from "@mui/material";
import { AccountCircle, BarChart, Home, Notes } from "@mui/icons-material";
import { Link, useLocation, useRouteLoaderData } from "react-router-dom";

export default () => {
  const { user } = useRouteLoaderData("root");
  const location = useLocation();
  const [selectedItem, setSelectedItem] = React.useState("home");

  React.useEffect(() => {
    // Update the selected item based on the current pathname
    const pathSegments = location.pathname.split("/");
    const key = pathSegments[pathSegments.length - 1];
    setSelectedItem(key || "home");
  }, [location.pathname]);

  const menuItems = [
    {
      key: "home",
      icon: <Home />,
      text: "Beranda",
      to: `/app/${user._id}/home`,
    },
    {
      key: "notes",
      icon: <Notes />,
      text: "Catatan",
      to: `/app/${user._id}/notes/expense`,
    },
    {
      key: "statistic",
      icon: <BarChart />,
      text: "Statistik",
      to: `/app/${user._id}/statistic`,
    },
    {
      key: "profile",
      icon: <AccountCircle />,
      text: "Profil",
      to: `/app/${user._id}/profile`,
    },
  ];

  return (
    <>
      <Drawer
        sx={{
          width: 350,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 350,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.key}
              selected={selectedItem === item.key}
              LinkComponent={Link}
              sx={{ px: 4, py: 2 }}
              to={item.to}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
