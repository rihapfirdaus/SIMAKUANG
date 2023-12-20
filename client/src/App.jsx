import React from "react";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Signup, action as actionSignup } from "./pages/Signup.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Dashboard, { loader as loaderDashboard } from "./pages/Dashboard.jsx";
import { Login, action as actionLogin } from "./pages/Login.jsx";
import Root from "./pages/Root.jsx";
import Home, { loader as loaderHome } from "./pages/Home.jsx";
import Statistik from "./pages/Statistik.jsx";
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
        // },
        //   {
        //     path: "/app/:userId/notes/income",
        //     element: <Income />,
        //     loader: loaderIncomes,
        //     action: actionIncomes,
        //   },
        //   {
        //     path: "/app/:userId/notes/saving",
        //     element: <Saving />,
        //     loader: loaderSavings,
        //   },
        //   {
        //     path: "/app/:userId/notes/debt",
        //     element: <Debt />,
        //     loader: loaderDebts,
        //   },
        // ],
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
