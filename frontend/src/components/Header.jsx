import React, {  useState } from "react";
import {
  HomeIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [keyword, setKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.user);

  function home() {
    navigate("/");
  }
  function login() {
    navigate("/login");
  }
  function cart() {
    navigate("/cart");
  }
  function account() {
    navigate("/account");
  }
  function wishlist() {
    navigate("/wishlist");
  }
  const actions = [
    {
      icon:
        location.pathname === "/" ? (
          <HomeSolid className="h-5 w-5 md:h-6 md:w-6 text-black" />
        ) : (
          <HomeIcon className="h-5 w-5 md:h-6 md:w-6 text-black" />
        ),
      name: "Home",
      func: home,
    },

    {
      icon:
        location.pathname === "/cart" ? (
          <ShoppingBagIconSolid className="h-5 w-5 md:h-6 md:w-6 text-black" />
        ) : (
          <ShoppingBagIcon className="h-5 w-5 md:h-6 md:w-6 text-black" />
        ),
      name: "Cart",
      func: cart,
    },
  ];

  if (isAuthenticated) {
    actions.push(
      {
        icon:
          location.pathname === "/wishlist" ? (
            <HeartIconSolid className="h-5 w-5 md:h-6 md:w-6 text-black" />
          ) : (
            <HeartIcon className="h-5 w-5 md:h-6 md:w-6 text-black" />
          ),

        name: "Wishlist",
        func: wishlist,
      },
      {
        icon:
          location.pathname === "/account" ? (
            <UserSolid className="h-5 w-5 md:h-6 md:w-6 text-black" />
          ) : (
            <UserIcon className="h-5 w-5 md:h-6 md:w-6 text-black" />
          ),

        name: "My Account",
        func: account,
      }
    );
  }
  if (!isAuthenticated) {
    actions.push({
      icon:
        location.pathname === "/login" ? (
          <UserSolid className="h-5 w-5 md:h-6 md:w-6 text-black" />
        ) : (
          <UserIcon className="h-5 w-5 md:h-6 md:w-6 text-black" />
        ),

      name: "Login",
      func: login,
    });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };


  return (
    <>
      {showSearch ? (
        <div className="md:p-6 p-2 flex items-center justify-center bg-slate-200 ">
          <XMarkIcon
            className="h-4 w-4 md:h-4 md:w-6 text-gray-900 hover:text-black absolute top-4 right-4"
            onClick={() => setShowSearch(!showSearch)}
          />

          <input
            className="md:p-3 p-2 md:w-[60%] w-[70%] text-sm bg-white outline-none rounded-md relative"
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            disabled={!keyword}
            onClick={submitHandler}
            className="absolute md:top-8 md:right-[22%] top-4 right-12 cursor-pointer"
          >
            <MagnifyingGlassIcon className="h-4 w-4 md:h-6 md:w-6 text-gray-500 hover:text-gray-400 " />
          </button>
        </div>
      ) : (
        <div className="bg-white flex flex-col sm:flex-row items-center sm:items-start justify-between p-0">
          <div className=" text-black writing-vertical text-upright p-0 font-serif sm:text-[100px] text-4xl text-center sm:m-7 sm:mt-6 m-6 sm:mb-4">
            FABIZO
          </div>
          <div className="flex sm:mt-5 mt-0 mb-0 sm:mb-0 items-center justify-center">
            <Tooltip title={"Search"}>
              <IconButton onClick={() => setShowSearch(true)}>
                <MagnifyingGlassIcon className="h-5 w-5 md:h-6 md:w-6 text-black" />
              </IconButton>
            </Tooltip>
            {actions.map((a) => (
              <Tooltip title={a.name} key={a.name} onClick={a.func}>
                <IconButton>{a.icon}</IconButton>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
