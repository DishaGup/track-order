import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((store) => store.authReducer);
  if (token == null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
