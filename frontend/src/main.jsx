import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage, { action as actionLogin } from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { Alert } from "@mui/material";
import DashboardPage, {
  loader as loaderDashboard,
  action as actionDashboard,
} from "./pages/DashboardPage.jsx";
import { action as actionGoogleAuth } from "./containers/GoogleAuth.js";

const router = createBrowserRouter(
  [
    {
      path: "/",
      loader: loaderDashboard,
      action: actionDashboard,
      errorElement: <ErrorPage />,
      element: <DashboardPage />,
    },
    {
      path: "/login",
      action: actionLogin,
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ],
  { basename: "/SaldoSiaga" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
