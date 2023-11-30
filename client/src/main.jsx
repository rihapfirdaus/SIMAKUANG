import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignupPage, { action as actionSignup } from "./pages/SignupPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import DashboardPage, {
  loader as loaderDashboard,
  action as actionDashboard,
} from "./pages/DashboardPage.jsx";
import LoginPage, { action as actionLogin } from "./pages/LoginPage.jsx";
import { action as actionAuthGoogle } from "./containers/GoogleAuth.js";

const router = createBrowserRouter([
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
    action: actionSignup,
    element: <SignupPage />,
  },
  {
    path: "/google-auth",
    action: actionAuthGoogle,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
