import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../Actions/product";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import Rating from "@mui/material/Rating";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/solid";
import { clearError } from "../Reducers/product";
import { addItemsToCart } from "../Actions/cart";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [heart, setHeart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const addtoCartHandler = async () => {
    await dispatch(addItemsToCart(params.id, quantity));
    toast.success("Item added to cart");
    setQuantity(1);
  };
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    dispatch(getProductDetails(params.id));
    window.scrollTo(0, 0);
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, params.id, error]);

  const toggleHeart = (e) => {
    setHeart((prev) => !prev);
  };
  const options = {
    size: "large",
    value: product?.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" flex flex-row items-start justify-stretch mb-6 flex-wrap">
            <div className="flex flex-row">
              {product?.images?.map((item, i) => (
                <img
                  className=" h-[460px]"
                  key={item.url}
                  src={item.url}
                  alt={`${i}slide`}
                />
              ))}
              {product?.images?.map((item, i) => (
                <img
                  className=" h-[460px]"
                  key={item.url}
                  src={item.url}
                  alt={`${i}slide`}
                />
              ))}
            </div>
            <div className="ml-4 sm:ml-8 mt-6 ">
              <h2 className="font-serif text-2xl md:text-4xl mb-4 ">
                {product?.name.toUpperCase()}
              </h2>
              <div className="flex items-center space-x-1 mb-4 ">
                <Rating
                  {...options}
                  style={{ color: "black" }}
                  size={window.innerWidth > 400 ? "large" : "small"}
                />
                <span className="text-gray-600 text-sm">
                  ({product?.numOfReviews} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-1 mb-3">
                <h1 className="font-sans text-xl">{`MRP ₹${product?.price}`}</h1>
                <p className="text-gray-600 text-sm mt-1">
                  (Inclusive of all taxes)
                </p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {product?.description}
              </p>

              <div className="flex items-center h-9 mb-4 justify-center border-1 border-gray-600 w-[120px]">
                <button
                  onClick={decreaseQuantity}
                  className="px-[15px]  hover:scale-110 hover:bg-slate-100 py-1 border-r-1 border-gray-600"
                >
                  –
                </button>
                <div className="px-[15px] py-1">{quantity}</div>
                <button
                  className="px-[15px] hover:scale-110 hover:bg-slate-100
                py-1 border-l-1 border-gray-600"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>

              <div className="flex items-center space-x-1 mb-3">
                <button
                  onClick={addtoCartHandler}
                  className="px-10 bg-black hover:bg-gray-700 text-sm font-serif text-white mr-4 py-4 rounded-md text-center "
                >
                  ADD TO CART
                </button>

                {heart ? (
                  <HeartOutline
                    className="h-9 w-9 text-red-500"
                    onClick={toggleHeart}
                  />
                ) : (
                  <HeartIcon
                    className="h-6 w-6 text-black"
                    onClick={toggleHeart}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-100 mb-6">
            {product?.reviews && product?.reviews[0] && (
              <h6 className="text-xl text-slate-800 font-serif text-start ml-4 p-2">
                REVIEWS
              </h6>
            )}
            {product?.reviews && product?.reviews[0] ? (
              <div className="flex flex-row flex-wrap items-center justify-start">
                {product?.reviews?.map((review) => (
                  <ReviewCard review={review} />
                ))}
              </div>
            ) : (
              <h6 className="text-xl text-slate-800 font-serif text-start ml-4 p-2">
                NO REVIEWS YET
              </h6>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
