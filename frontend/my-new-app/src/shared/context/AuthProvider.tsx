import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, expirationTime: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const expirationTimeInMillis = new Date(expirationTime).getTime();
  return expirationTimeInMillis - currentTime;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    if (token && expirationTime) {
      const remainingTime = calculateRemainingTime(expirationTime);
      if (remainingTime > 0) {
        setIsLoggedIn(true);
        setTimeout(logout, remainingTime);
      } else {
        logout();
      }
    }
    setIsAuthChecked(true);
  }, []);

  const login = (token: string, expirationTime: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    setIsLoggedIn(true);
    navigate(`/`);
    setTimeout(logout, calculateRemainingTime(expirationTime));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    setIsLoggedIn(false);
    navigate(`/signin`);
  };

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
