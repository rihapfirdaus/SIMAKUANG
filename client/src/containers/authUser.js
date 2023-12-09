import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const getAuthUser = () => {
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
