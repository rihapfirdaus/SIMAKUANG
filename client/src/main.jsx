import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginComp from "./components/LoginComp.jsx";
import SignupComp from "./components/SignupComp.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { Alert } from "@mui/material";
import DashboardPage, {
  loader as loaderDashboard,
  action as actionDashboard,
} from "./pages/DashboardPage.jsx";
import { action as actionGoogleAuth } from "./containers/GoogleAuth.js";
import AuthPage, { action as actionAuth } from "./pages/AuthPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: loaderDashboard,
    action: actionDashboard,
    errorElement: <ErrorPage />,
    element: <DashboardPage />,
  },
  {
    path: "/auth",
    action: actionAuth,
    element: <AuthPage />,
    children: [
      { path: "/auth/login", element: <LoginComp /> },
      { path: "/auth/signup", element: <SignupComp /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
