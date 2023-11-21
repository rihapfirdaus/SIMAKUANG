import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginComp from "./components/LoginComp.jsx";
import SignupComp from "./components/SignupComp.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import UnderConstructionPage from "./pages/UnderConstructionPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <a href="/SaldoSiaga/login">click here to login!</a>,
    },
    { path: "/login", element: <LoginComp /> },
    { path: "/signup", element: <SignupComp /> },
  ],
  { basename: "/SaldoSiaga" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <UnderConstructionPage />
  </React.StrictMode>
);
