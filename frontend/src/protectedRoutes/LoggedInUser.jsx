import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const LoggedInUser = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  if (!isAuthenticated) {
    return navigate("/login");
  }
  return <Outlet />;
};

export default LoggedInUser;
