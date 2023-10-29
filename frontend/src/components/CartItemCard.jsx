import React, {  useState } from "react";
import "../styles/cartItemCard.css";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../Actions/cart";
import { removeItemsFromCart, removeThisItem } from "../Reducers/cart";

const CartItemCard = ({ item, showCross=true }) => {
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
    <div className="flex items-center justify-between w-full m-2 border-b-1 border-gray-800 pb-2 ">
      <div className="flex flex-row">
        {showCross && (

        <button className="p-2 hover:text-blue-600" onClick={removeThisProduct}>
          x
        </button>
        )}
        <img
          src="https://images.pexels.com/photos/15395295/pexels-photo-15395295/free-photo-of-portrait-of-a-woman-posing-in-a-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="h-64 w-40"
          alt=""
        />
      </div>
      <Link
        to={`/product/${item.product}`}
        className="text-sm w-16 text-start text-gray-600"
      >
        {item.name}
      </Link>
      <div className="font-bold text-black">{item.price}</div>
      <div className="font-bold text-black">x</div>
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
      <div>₹{item.quantity * item.price}</div>
    </div>
  );
};

export default CartItemCard;
