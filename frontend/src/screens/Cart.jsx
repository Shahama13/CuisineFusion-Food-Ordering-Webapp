import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const checkoutHandler = () => {
    navigate("/login?redirect=address");
  };

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subTotal > 999 ? 0 : 200; // Now it's a number, not a string
  const gst = 0.02 * subTotal;
  const total = subTotal + shippingCharges + gst;

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="flex px-2 md:p-0 flex-col w-full  items-center justify-center">
          <ShoppingCartIcon className="h-16 w-16 mt-6 text-black md:mb-2 mb-0" />
          <h1 className="font-serif text-center md:text-2xl text-lg font-bold text-black">
            YOUR CART IS EMPTY! SHOP NOW!
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="font-serif p-2 md:px-9 px-3 rounded-md text-white w-fit bg-black md:mt-5 mt-3 text-sm md:text-base hover:bg-gray-700"
          >
            SHOP NOW!
          </button>
        </div>
      ) : (
        <div className="flex flex-col  md:flex-row p-2 md:space-x-7 space-x-0 ">
          <div className="flex flex-col w-full ">
            <h1 className=" text-lg text-center sm:text-2xl m-2 text-slate-700 font-serif">
              SHOPPING CART
            </h1>

            <div>
              {cartItems &&
                cartItems.map((item) => (
                  <CartItemCard item={item} key={item.product} />
                ))}
            </div>
          </div>

          <div className="w-full md:1/2  bg-purple-50 sm:px-5 sm:pb-5 px-2 py-0  h-fit flex flex-col">
            <h3 className="font-serif sm:text-xl text-lg text-slate-700 text-center my-2 ">
              PRICE DETAILS
            </h3>
            <div className="space-y-2">
              <div className="text-sm sm:text-base w-full flex justify-between">
                <div>Subtotal</div>
                <div>₹{subTotal}</div>
              </div>
              <div className=" w-full text-sm sm:text-base flex justify-between ">
                <div>
                  Shipping{" "}
                  <span className="text-[6px] sm:text-sm  text-red-400">
                    (Free on orders above 999)
                  </span>
                </div>
                <div>₹{shippingCharges}</div>
              </div>
              <div className="w-full text-sm sm:text-base flex justify-between ">
                <div>GST</div>
                <div>₹{gst}</div>
              </div>
              <div className="text-sm sm:text-base w-full flex justify-between font-bold">
                <div>Total</div>
                <div>₹{total}</div>
              </div>
            </div>

            <button
              onClick={checkoutHandler}
              className="w-full text-sm sm:text-lg p-0 py-2 sm:p-3 my-2 bg-black text-white hover:bg-gray-700 font-serif"
            >
              PROCCED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
