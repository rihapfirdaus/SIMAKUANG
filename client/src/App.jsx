import React from "react";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Signup, action as actionSignup } from "./pages/Signup.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Dashboard, { loader as loaderDashboard } from "./pages/Dashboard.jsx";
import { Login, action as actionLogin } from "./pages/Login.jsx";
import Root from "./pages/Root.jsx";
import Home, { loader as loaderHome } from "./pages/Home.jsx";
import Statistik, { loader as loaderStatistik } from "./pages/Statistik.jsx";
import Profile from "./pages/Profile.jsx";
import Notes, {
  action as actionNotes,
  loader as loaderNotes,
} from "./pages/Notes.jsx";
import Update, {
  action as actionUpdate,
  loader as loaderUpdate,
} from "./pages/Update.jsx";
import Delete, { action as actionDelete } from "./pages/Delete.jsx";
import Logout, { action as actionLogout } from "./pages/Logout.jsx";

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
        loader: loaderHome,
        element: <Home />,
      },
      {
        path: "/app/:userId/notes/:type",
        element: <Notes />,
        loader: loaderNotes,
        action: actionNotes,
        children: [
          {
            path: "/app/:userId/notes/:type/update/:id",
            action: actionUpdate,
            loader: loaderUpdate,
            element: <Update />,
          },
          {
            path: "/app/:userId/notes/:type/delete/:id",
            action: actionDelete,
            element: <Delete />,
          },
        ],
      },
      {
        path: "/app/:userId/statistic",
        loader: loaderStatistik,
        element: <Statistik />,
      },
      {
        path: "/app/:userId/profile",
        element: <Profile />,
        children: [
          {
            path: "/app/:userId/profile/logout",
            action: actionLogout,
            element: <Logout />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    action: actionLogin,
    element: <Login />,
  },
  {
    path: "/signup",
    action: actionSignup,
    element: <Signup />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
