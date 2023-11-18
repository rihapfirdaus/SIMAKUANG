import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";

const router = createBrowserRouter(
  [
    { path: "/", element: <a href="/login">click here to login!</a> },
    { path: "/SaldoSiaga/login", element: <LoginForm /> },
    { path: "/SaldoSiaga/signup", element: <SignupForm /> },
  ],
  { basename: "/SaldoSiaga" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
