import React, { useEffect, useState } from "react";
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

  const { user } = useSelector((state) => state.user);

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
          <HomeSolid className="h-4 w-4 md:h-6 md:w-6 text-black" />
        ) : (
          <HomeIcon className="h-4 w-4 md:h-6 md:w-6 text-black" />
        ),
      name: "Home",
      func: home,
    },

    {
      icon:
        location.pathname === "/cart" ? (
          <ShoppingBagIconSolid className="h-4 w-4 md:h-6 md:w-6 text-black" />
        ) : (
          <ShoppingBagIcon className="h-4 w-4 md:h-6 md:w-6 text-black" />
        ),
      name: "Cart",
      func: cart,
    },
  ];

  if (user) {
    actions.push(
      {
        icon:
          location.pathname === "/wishlist" ? (
            <HeartIconSolid className="h-4 w-4 md:h-6 md:w-6 text-black" />
          ) : (
            <HeartIcon className="h-4 w-4 md:h-6 md:w-6 text-black" />
          ),

        name: "Wishlist",
        func: wishlist,
      },
      {
        icon:
          location.pathname === "/account" ? (
            <UserSolid className="h-4 w-4 md:h-6 md:w-6 text-black" />
          ) : (
            <UserIcon className="h-4 w-4 md:h-6 md:w-6 text-black" />
          ),

        name: "My Account",
        func: account,
      }
    );
  }
  if (!user) {
    actions.push({
      icon:
        location.pathname === "/login" ? (
          <UserSolid className="h-4 w-4 md:h-6 md:w-6 text-black" />
        ) : (
          <UserIcon className="h-4 w-4 md:h-6 md:w-6 text-black" />
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

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
      {showSearch ? (
        <div className="p-6 flex items-center justify-center bg-slate-200 ">
          <XMarkIcon
            class="h-6 w-6 text-gray-900 hover:text-black absolute top-4 right-4"
            onClick={() => setShowSearch(!showSearch)}
          />

          <input
            className="p-3 w-[60%] text-sm bg-white outline-none rounded-md relative"
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            disabled={!keyword}
            onClick={submitHandler}
            className="absolute top-8 right-[22%] cursor-pointer"
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
              <IconButton>
                <MagnifyingGlassIcon
                  onClick={() => setShowSearch(true)}
                  className="h-4 w-4 md:h-6 md:w-6 text-black"
                />
              </IconButton>
            </Tooltip>
            {actions.map((a) => (
              <Tooltip title={a.name}>
                <IconButton onClick={a.func}>{a.icon}</IconButton>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
