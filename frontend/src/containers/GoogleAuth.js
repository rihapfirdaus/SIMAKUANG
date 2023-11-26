import { auth } from "../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { redirect, useNavigate } from "react-router-dom";
const googleProvider = new GoogleAuthProvider();

export async function action() {
  var AuthStatus;
  try {
    AuthStatus = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    console.log("ini jalan ga ya");
  } catch (error) {
    AuthStatus = false;
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData ? error.customData.email : null;
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.error(`Google Login Error [${errorCode}]: ${errorMessage}`);
  }
  return AuthStatus ? redirect("/") : redirect(-1);
}
