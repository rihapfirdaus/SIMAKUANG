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

const router = createBrowserRouter(routes, { basename: "/SaldoSiaga" }, [
  { path: "/", element: <a href="/login">click here!</a> },
  { path: "/login", element: <LoginForm /> },
  { path: "/signup", element: <SignupForm /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
