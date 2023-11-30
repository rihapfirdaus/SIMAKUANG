import { auth } from "../services/firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";

export async function action() {
  const googleProvider = new GoogleAuthProvider();
  var authStatus;
  try {
    await signInWithPopup(auth, googleProvider);
    authStatus = true;
  } catch (error) {
    console.error(error);
    authStatus = false;
  }
  return authStatus ? redirect("/") : { error: "yahh error :(" };
}
