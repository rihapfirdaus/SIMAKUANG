import React, { useState, useEffect } from "react";
import { auth } from "../services/firebase";

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setIsLoggedIn(!!authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isLoggedIn;
}

export default useAuth;
