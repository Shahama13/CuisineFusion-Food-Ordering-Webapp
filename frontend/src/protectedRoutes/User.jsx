import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const User = () => {
  const {isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (isAuthenticated === false) {
    return navigate("/login");
  }
  else{
    return <Outlet />;
  }
};

export default User;
