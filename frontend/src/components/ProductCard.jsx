import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../Actions/cart";
import toast from "react-hot-toast";
import { addRemoveItems, getMyWishlist } from "../Actions/user";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const [heart, setHeart] = useState(false);
  const [show, setShow] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.user);

  const toggleHeart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return toast.error("Login to add to wishlist");
    }
    dispatch(addRemoveItems(product._id));
    dispatch(getMyWishlist());
  };

  const options = {
    precision: 0.5,
    readOnly: true,
    value: product.ratings,
    color: "black",
  };

  useEffect(() => {
    wishlist?.forEach((item) => {
      if (item._id === product._id) {
        setHeart(true);
      }
    });
  }, [wishlist, product._id]);

  return (
    <Link
      className="m-[1px] w-[130px]  md:w-[168px] lg:w-[230px] p-0 mb-5 relative hover:bg-gray-100 "
      to={`/product/${product._id}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <img
        src={product?.images[0]?.url}
        className="w-full h-[230px] lg:h-[300px]"
        alt=""
      />

      {(show || heart) && (
        <button
          onClick={toggleHeart}
          className="absolute top-1 left-1 z-30 bg-white p-1 rounded-full"
        >
          {heart ? (
            <HeartOutline className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-black" />
          )}
        </button>
      )}

      <div className="flex flex-col items-center justify-center space-y-1 my-2 mb-3 ">
        <p className="text-center font-bold sm:tracking-wide text-sm">
          {product.name.toUpperCase()}
        </p>
        <Rating {...options} size="small" style={{ color: "black" }} />
        <div
          className=""
          onMouseEnter={() => setShowCart(true)}
          onMouseLeave={() => setShowCart(false)}
        >
          {showCart ? (
            <button
              className="text-sm font-mono border-b-2 border-black"
              onClick={async (e) => {
                e.preventDefault();
                await dispatch(addItemsToCart(product._id, 1));
                toast.success("Added to cart");
              }}
            >
              ADD TO CART
            </button>
          ) : (
            <p className="text-sm sm:text-base">{`₹${product.price}`}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
