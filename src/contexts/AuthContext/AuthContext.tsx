import { createContext, useEffect, useState } from "react";
import AuthContextType from "./AuthContextType";
import { checkIfTokenValid, getUserIdFromToken } from "../../helpers/utils";

export const AuthContext = createContext<AuthContextType>({
  checkLoggedIn: () => null,
  currentUserId: null,
  setToken: (_prev) => null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [currentUserId, setCurrentUserId] = useState(getUserIdFromToken(token));

  // if someone manually modifies the token from browser
  useEffect(() => {
    const handleLocalStorageChange = () => {
      console.log("--storage modified manually--");
      setToken(() => localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleLocalStorageChange);
    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, []);

  // if token is modified then change currentUserId
  useEffect(() => {
    localStorage.setItem("token", token!);
    setCurrentUserId(() => getUserIdFromToken(token));
  }, [token]);

  // check if logged in, but only when the token changes (for optimization)
  const checkLoggedIn = () => {
    if (checkIfTokenValid(token)) {
      return true;
    }
    setToken(() => null);
    return false;
  };

  return (
    <AuthContext.Provider value={{ currentUserId, checkLoggedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
