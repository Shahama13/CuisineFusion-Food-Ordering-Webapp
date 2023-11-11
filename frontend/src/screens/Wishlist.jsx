import React, { useEffect } from "react";
import MetaData from "../MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { getMyWishlist } from "../Actions/user";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  useEffect(() => {
    dispatch(getMyWishlist());
  }, [dispatch]);
  return (
    <>
      <MetaData title="Fabizo - Wishlist" />

      {!isAuthenticated ? (
        <div className="flex px-2 md:p-0 flex-col w-full  items-center justify-center">
          <DevicePhoneMobileIcon className="md:h-32 md:w-32 h-16 w-16 mt-6 text-black md:mb-2 mb-0" />
          <h1 className="font-serif text-center md:text-2xl text-lg font-bold text-black">
            LOGIN TO VIEW WISHLIST
          </h1>
          <Link
            to={"/login"}
            className="font-serif p-2 md:px-9 px-3 rounded-md text-white w-fit bg-black md:mt-5 mt-3 text-sm md:text-base hover:bg-gray-700"
          >
            LOGIN
          </Link>
        </div>
      ) : wishlist?.length === 0 ? (
        <div className="flex px-2 md:p-0 flex-col w-full  items-center justify-center mt-10">
          <h1 className="font-serif text-center md:text-2xl text-lg font-bold text-black">
            NOTHING IN HERE
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="font-serif p-2 md:px-9 px-3 rounded-md text-white w-fit bg-black md:mt-5 mt-3 text-sm md:text-base hover:bg-gray-700"
          >
            BROWSE PRODUCTS
          </button>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap items-center justify-center mt-6">
          {wishlist?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Wishlist;
