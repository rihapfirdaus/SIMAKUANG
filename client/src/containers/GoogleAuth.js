import { auth } from "../services/firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";

export async function action() {
  const googleProvider = new GoogleAuthProvider();
  var authStatus;
  try {
    await signInWithRedirect(auth, googleProvider);

    console.log("ini jalan ga ya");
  } catch (error) {
    console.error(`Google Login Error [${errorCode}]: ${errorMessage}`);
  }
  return redirect("/");
}
