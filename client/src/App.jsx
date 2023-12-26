import React from "react";
import "./styles/index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useSearchParams,
} from "react-router-dom";
import { Signup, action as actionSignup } from "./pages/Signup.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Dashboard, { loader as loaderDashboard } from "./pages/Dashboard.jsx";
import { Login, action as actionLogin } from "./pages/Login.jsx";
import Root from "./pages/Root.jsx";
import Home, { loader as loaderHome } from "./pages/Home.jsx";
import Statistik, { loader as loaderStatistik } from "./pages/Statistik.jsx";
import Profile, {
  action as actionProfil,
  loader as loaderProfil,
} from "./pages/Profile.jsx";
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
import useAuth from "./utils/useAuth.jsx";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Root />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/app/:userId",
          loader: loaderDashboard,
          element: useAuth() ? <Dashboard /> : <Navigate to={`/`} />,
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
              loader: loaderProfil,
              action: actionProfil,
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
        { path: "*", element: <Navigate to="/app/:userId" replace /> },
      ])}
    />
  );
}
