import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext.js";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);

  if (user) {
    return (
        <>
            <Outlet />
        </>
    )
}
else {
    return (
        <Navigate to='/' />
    )
}
};

export default ProtectedRoute;