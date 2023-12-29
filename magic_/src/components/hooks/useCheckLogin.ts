import { useEffect, useState } from "react";
import { LOCAL_LOGIN_KEY } from "../../utils/constant";

export const useCheckLogin = () => {
  let [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    setIsLogged(Boolean(localStorage.getItem(LOCAL_LOGIN_KEY)));

    function callback() {
      if (typeof window !== "undefined") {
        console.log("You are on the browser");
        const initialToken = Boolean(localStorage.getItem(LOCAL_LOGIN_KEY));
        setIsLogged(initialToken);
        console.log("InitialToken set " + initialToken);
      } else {
        const initialToken = Boolean(localStorage.getItem(LOCAL_LOGIN_KEY));
        setIsLogged(initialToken);
        console.log("You are on the server and token is " + initialToken);
      }
    }
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }, []);

  return isLogged;
};
