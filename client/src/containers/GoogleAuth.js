import { auth } from "../services/firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";

export async function action() {
  const googleProvider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error(error);
  }
  return redirect("/");
}
