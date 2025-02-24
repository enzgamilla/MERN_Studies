import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/AuthContextHook";
import React from "react";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  // If the user is not logged in, redirect to the sign-in page
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  // If the user is logged in, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
