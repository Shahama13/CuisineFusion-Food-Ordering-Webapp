import React, { useEffect } from "react";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { deleteOrders, getAllOrders } from "../Actions/order";
import { clearOrderError, successReset } from "../Reducers/order";
import toast from "react-hot-toast";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, allOrders, error, success } = useSelector(
    (state) => state.adminOrder
  );

  useEffect(() => {
    dispatch(getAllOrders());
    if (success) {
      dispatch(successReset());
    }
    if (error) {
      toast.error(error);
      dispatch(clearOrderError());
    }
  }, [dispatch, error, success]);
  return (
    <>
      <TopBar />
      <div className="overflow-x-scroll">
        <div className="flex justify-between text-sm sm:text-base mx-3 mb-6 text-center bg-teal-50 overflow-x-scroll min-w-[634px]">
          <div className="w-52">
            ORDER ID{" "}
            <span className="text-red-500 text-xs">click to change status</span>
          </div>
          <div className="w-36">STATUS</div>
          <div className="w-16">AMOUNT</div>
          <div>ACTIONS</div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          allOrders &&
          [...allOrders].reverse().map((order) => (
            <div
              key={order._id}
              className="flex justify-between text-xs sm:text-sm  mx-3 mb-2 text-center py-1 bg-blue-50 min-w-[634px]"
            >
              <Link
                to={`/order/${order._id}?name=${"ChangeStatus"}`}
                className="w-52 cursor-pointer hover:text-blue-700"
              >
                {order._id}
              </Link>
              <div className="w-36">{order.orderStatus}</div>
              <div className="w-16">{order.totalPrice}</div>
              <div className="flex items-center justify-center">
                <PencilSquareIcon
                  onClick={() => navigate(`/admin/order/${order._id}`)}
                  className="md:h-5 md:w-5 h-4 w-4 text-gray-500 hover:text-gray-800 mr-4"
                />
                <TrashIcon
                  onClick={() => {
                    dispatch(deleteOrders(order._id));
                    dispatch(getAllOrders());
                  }}
                  className="md:h-5 md:w-6 h-4 w-4 text-red-300  hover:text-red-700"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Orders;
