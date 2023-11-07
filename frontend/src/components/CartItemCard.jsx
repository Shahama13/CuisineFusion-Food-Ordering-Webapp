import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../Actions/cart";
import { removeItemsFromCart, removeThisItem } from "../Reducers/cart";

const CartItemCard = ({ item, showCross = true }) => {
  const dispatch = useDispatch();
  const [showHey, setShowHey] = useState(false);

  const increaseQuantity = () => {
    dispatch(addItemsToCart(item.product, 1));
  };

  const removeThisProduct = () => {
    dispatch(removeThisItem(item.product));
  };

  const decreaseQuantity = () => {
    dispatch(removeItemsFromCart(item.product));
  };

  return (
    <div className="flex items-center bg-slate-50 justify-evenly sm:justify-between w-full mb-2 border-b-1 border-gray-800 sm:px-2 p-0">
      <div className="flex flex-row">
        {showCross && (
          <button
            className="sm:p-2 p-1 hover:text-blue-600"
            onClick={removeThisProduct}
          >
            x
          </button>
        )}
        <img src={item.image} className="h-24 w-16 md:h-32 md:w-28" alt="" />
      </div>

      <div className="flex flex-col w-[60%] sm:flex-row items-center justify-center space-x-2">
        <Link
          to={`/product/${item.product}`}
          className="text-sm mr:3 md:text-lg font-serif w-16 text-start text-black"
        >
          {item.name.toUpperCase()}
        </Link>
        <div className="flex items-center justify-center space-x-1">
          <div className="text-sm font-bold text-black">{item.price}</div>
          <div className="text-sm font-bold text-black">x</div>
          <div
            className="text-sm text-black m-1"
            onMouseEnter={() => setShowHey(true)}
            onMouseLeave={() => setShowHey(false)}
          >
            {showHey ? (
              <>
                <div className="flex items-center h-7  justify-center border-1 border-gray-600">
                  <button
                    onClick={decreaseQuantity}
                    className="px-2 py-1 border-r-1 border-gray-600"
                  >
                    –
                  </button>
                  <div className="p-2">{item.quantity}</div>
                  <button
                    className="px-2 py-1 border-l-1 border-gray-600"
                    style={{ borderLeft: "1px solid black" }}
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </>
            ) : (
              <div className="px-2 py-1 border-1 border-gray-600">
                {item.quantity}
              </div>
            )}
          </div>
          <div>=</div>
          <div> ₹{item.quantity * item.price}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
