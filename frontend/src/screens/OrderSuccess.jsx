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
      <div className="flex flex-col w-full h-[100vh] items-center justify-center">
        <CheckBadgeIcon className="h-32 w-32 text-black mb-2" />
        <h1 className="font-serif text-center text-2xl font-bold text-black">
          YOUR ORDER HAS BEEN PLACED SUCCESFULLY!
        </h1>
        <button
          onClick={() => navigate("/orders/me")}
          className="font-serif p-2 px-9 text-white w-fit bg-black mt-5 hover:bg-gray-700"
        >
          VIEW ORDERS
        </button>
      </div>
    </>
  );
};

export default OrderSuccess;
