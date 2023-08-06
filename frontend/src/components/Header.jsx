import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from '@mui/icons-material/Search';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

const Header = () => {
  const handleMenuItemClick = () => {
    const navToggler = document.getElementById("nav-toggler");
    if (navToggler) {
      navToggler.checked = false;
    }
  };

  return (
    <>
      <input type="checkbox" id="nav-toggler" className="fas fa-bars" />

      <nav className="navbar">
        <Link to="/" data-text="home" onClick={handleMenuItemClick}>
          <HomeIcon  fontSize="large" sx={{ marginRight: "10px" }} />
          <h6>Home</h6>
        </Link>
        <Link to="/products" data-text="home" onClick={handleMenuItemClick}>
          <FastfoodIcon fontSize="large" sx={{ marginRight: "10px" }} />
          <h6>Browse Menu</h6>
        </Link>
        <Link to="/search" data-text="home" onClick={handleMenuItemClick}>
          <SearchIcon fontSize="large" sx={{ marginRight: "10px" }} />
          <h6>Search</h6>
        </Link>
        <Link to="/cart" data-text="home" onClick={handleMenuItemClick}>
          <LocalMallIcon fontSize="large" sx={{ marginRight: "10px" }} />
          <h6>Cart</h6>
        </Link>
        <Link to="/account" data-text="home" onClick={handleMenuItemClick}>
          <AccountBoxRoundedIcon fontSize="large" sx={{ marginRight: "10px" }} />
          <h6>Account</h6>
        </Link>
      </nav>
    </>
  );
};

export default Header;
