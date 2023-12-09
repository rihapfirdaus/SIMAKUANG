import React from "react";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Signup, action as actionSignup } from "./pages/Signup.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Dashboard, { loader as loaderDashboard } from "./pages/Dashboard.jsx";
import { Login, action as actionLogin } from "./pages/Login.jsx";
import Root from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import Notes from "./pages/Notes.jsx";
import Statistik from "./pages/Statistik.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app/:userId",
    loader: loaderDashboard,
    element: <Dashboard />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/app/:userId/home",
        element: <Home />,
      },
      {
        path: "/app/:userId/notes",
        element: <Notes />,
      },
      {
        path: "/app/:userId/statistic",
        element: <Statistik />,
      },
      {
        path: "/app/:userId/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    action: actionLogin,
    element: <Login />,
    errorElement: <ErrorPage />,

    // async lazy() {
    //   let { actionLogin, LoginPage } = await import("./pages/LoginPage.jsx");
    //   return {
    //     action: actionLogin,
    //     Component: LoginPage,
    //   };
    // },
  },
  {
    path: "/signup",
    action: actionSignup,
    element: <Signup />,
    errorElement: <ErrorPage />,
    // lazy: () => import("./pages/SignupPage.jsx"),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
