import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginComp from "./components/LoginComp.jsx";
import SignupComp from "./components/SignupComp.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <a href="/SaldoSiaga/login">click here to login!</a>,
    },
    { path: "/login", element: <LoginComp /> },
    { path: "/signup", element: <SignupComp /> },
  ],
  { basename: "/SaldoSiaga" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
