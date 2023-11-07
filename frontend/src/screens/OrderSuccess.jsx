import React, { useEffect } from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMyOrders } from "../Actions/order";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex px-2 md:p-0 flex-col w-full  items-center justify-center">
        <CheckBadgeIcon className="md:h-32 md:w-32 h-16 w-16 mt-6 text-black md:mb-2 mb-0" />
        <h1 className="font-serif text-center md:text-2xl text-lg font-bold text-black">
          YOUR ORDER HAS BEEN PLACED SUCCESFULLY!
        </h1>
        <button
          onClick={() => navigate("/orders")}
          className="font-serif p-2 md:px-9 px-3 rounded-md text-white w-fit bg-black md:mt-5 mt-3 text-sm md:text-base hover:bg-gray-700"
        >
          VIEW ORDERS
        </button>
      </div>
    </>
  );
};

export default OrderSuccess;
