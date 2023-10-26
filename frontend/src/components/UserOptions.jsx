import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userOptions.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions/user";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Backdrop from "@mui/material/Backdrop";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  const actions = [
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <FastfoodIcon />, name: "BrowseMenu", func: browseMenu },
    { icon: <SearchIcon />, name: "Search", func: search },
    { icon: <ShoppingBagIcon />, name: "Cart", func: cart },
  ];
  function home() {
    navigate("/");
  }
  function browseMenu() {
    navigate("/products");
  }
  function login() {
    navigate("/login");
  }
  function search() {
    navigate("/search");
  }
  function cart() {
    navigate("/cart");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function dashboard() {
    navigate("/dashboard");
  }
  function logoutUser() {
    dispatch(logout());
    navigate("/products");
  }
  if (user) {
    actions.push(
      { icon: <PersonIcon />, name: "My Account", func: account },
      { icon: <ListAltIcon />, name: "My Orders", func: orders },
      { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    );
  }
  if (!user) {
    actions.push({ icon: <AccountCircleIcon />, name: "Login", func: login });
  }
  if (user?.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      <Backdrop
        sx={{ zIndex:200 }}
        open={open}
      ></Backdrop>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        open={open}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        direction="down"zz
        className="speedDial"
        icon={<MenuIcon />}
      >
        {actions.map((a) => (
          <SpeedDialAction
            key={a.name}
            icon={a.icon}
            tooltipTitle={a.name}
            onClick={a.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
