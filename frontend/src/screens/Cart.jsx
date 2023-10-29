import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

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
        <div>Nothing here</div>
      ) : (
        <div className="flex flex-col  sm:flex-row p-2 sm:p-6 space-x-7 ">
          <div className="flex flex-col w-full md:w-2/3 ">
            <h1 className=" text-2xl sm:mt-7 mb-3 sm:mb-4 font-serif">
              Shopping Cart
            </h1>
            <div className="hidden md:flex p-3 w-full justify-end space-x-16 border-y-1 border-gray-500">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            <div>
              {cartItems &&
                cartItems.map((item) => (
                  <CartItemCard item={item} key={item.product} />
                ))}
            </div>
          </div>

          <div className="md:w-1/3 w-full">
            <h1 className=" text-2xl mb-6 mt-7 md:mb-6 font-serif">
              Cart Totals
            </h1>
            <div className=" px-2 mb-1 w-full flex justify-between">
              <div>Subtotal</div>
              <div>subTotal</div>
            </div>
            <div className="px-2 w-full mb-0 flex justify-between ">
              <div>
                Shipping{" "}
                <span className="text-sm text-red-400">
                  (Free on orders above 999)
                </span>
              </div>
              <div>{shippingCharges}</div>
            </div>
            <div className="px-2 w-full mb-0 flex justify-between ">
              <div>GST</div>
              <div>{gst}</div>
            </div>
            {/* <div className="px-2 mb-1 w-full mb-0 flex justify-between ">
              <div>Packaging</div>
              <div>50</div>
            </div> */}

            <div className="p-2 py-5 w-full flex justify-between border-y-1 border-gray-500">
              <div>Total</div>
              <div>{total}</div>
            </div>
            <button
              onClick={checkoutHandler}
              className="w-full p-3 my-2 bg-black text-white hover:bg-gray-700"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
