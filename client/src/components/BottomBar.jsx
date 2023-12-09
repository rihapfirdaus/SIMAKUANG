import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper } from "@mui/material";
import { AccountCircle, BarChart, Home, Notes } from "@mui/icons-material";
import { Link, useLocation, useRouteLoaderData } from "react-router-dom";

export default () => {
  const { user } = useRouteLoaderData("root");
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    // Update the selected value based on the current pathname
    const pathSegments = location.pathname.split("/");
    const key = pathSegments[pathSegments.length - 1];

    // Map the key to the index of BottomNavigationAction
    const indexMap = {
      home: 0,
      notes: 1,
      statistic: 2,
      profile: 3,
    };

    setValue(indexMap[key] || 0);
  }, [location.pathname]);

  return (
    <Paper
      className="fixed bottom-0 left-0 right-0 lg:hidden z-10"
      elevation={5}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          "& .Mui-selected ": {
            color: "darkgreen",
          },
          "& .MuiBottomNavigationAction-root.Mui-selected": {
            color: "darkgreen",
          },
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          component={Link}
          to={`/app/${user.uid}/home`}
          key="beranda"
          label="Beranda"
          icon={<Home />}
        />
        <BottomNavigationAction
          component={Link}
          to={`/app/${user.uid}/notes`}
          key="catatan"
          label="Catatan"
          icon={<Notes />}
        />
        <BottomNavigationAction
          component={Link}
          to={`/app/${user.uid}/statistic`}
          key="statistik"
          label="Statistik"
          icon={<BarChart />}
        />
        <BottomNavigationAction
          component={Link}
          to={`/app/${user.uid}/profile`}
          key="profil"
          label="Profil"
          icon={<AccountCircle />}
        />
      </BottomNavigation>
    </Paper>
  );
};
