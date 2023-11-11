import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
   setAnchorEl(null);
  };

  return (
    <div className="bg-purple-50 p-2 sm:py-1 mt-4 flex items-center justify-evenly mb-6">
      <Link
        to={"/admin/dashboard"}
        className={`cursor-pointer text-[12px] sm:text-base ${
          location.pathname === "/admin/dashboard"
            ? "underline underline-offset-4"
            : ""
        }`}
      >
        DashHome
      </Link>
      <div>
        <div
          className={`cursor-pointer text-[12px] sm:text-base  ${
            location.pathname === "/admin/products"||
            location.pathname === "/admin/product"
              ? "underline underline-offset-4"
              : ""
          }`}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Products
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div
            onClick={() => {
              navigate("/admin/product");
              setAnchorEl(null);
            }}
            className="cursor-pointer text-[12px] sm:text-base  mx-2 mb-2 mt-1 "
          >
            Create New
          </div>
          <div
            onClick={() => {
              navigate("/admin/products");
              setAnchorEl(null);
            }}
            className="cursor-pointer text-[12px] sm:text-base mx-2 mb-1 "
          >
            All
          </div>
        </Menu>
      </div>

      <Link
        to={"/admin/orders"}
        className={`text-[12px] sm:text-base  ${
          location.pathname === "/admin/orders"
            ? "underline underline-offset-4"
            : ""
        }`}
      >
        Orders
      </Link>
      <Link
        to={"/admin/users"}
        className={`text-[12px] sm:text-base  ${
          location.pathname === "/admin/users"
            ? "underline underline-offset-4"
            : ""
        }`}
      >
        Users
      </Link>
    </div>
  );
};

export default TopBar;
