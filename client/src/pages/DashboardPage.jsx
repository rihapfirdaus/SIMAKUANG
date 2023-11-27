import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";

const getAuthUser = (auth) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        resolve(authUser);
      } else {
        resolve(null);
      }
    });
  });
};

export async function loader() {
  const user = await getAuthUser(auth);
  return user ? { user } : redirect("/auth");
}

export async function action() {
  console.log("ini berjalan");
  await signOut(auth);
  return redirect("/login");
}

export default function DashboardPage() {
  const { user } = useLoaderData();
  return (
    <div>
      <h1>ini dashboard page okeh!!</h1>
      <h1>Welcome, {user.displayName || user.email}!</h1>
      {user.photoURL && <img src={user.photoURL} alt="User Profile" />}
      <p>Email: {user.email}</p>
      <p>User ID: {user.uid}</p>
      <Form method="post">
        <button type="submit">logout</button>
      </Form>
    </div>
  );
}
