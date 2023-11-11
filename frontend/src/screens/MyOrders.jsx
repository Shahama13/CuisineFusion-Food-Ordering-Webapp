import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrders } from "../Actions/order";
import { clearErrors } from "../Reducers/order";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";
const MyOrders = () => {
  const dispatch = useDispatch();
  const { myOrders, loading, error } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getMyOrders());
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="My Orders" />
      <div>
        <h1 className="font-serif mb-2 text-center text-xl sm:text-2xl font-bold mt-4 text-slate-700">
          MY ORDERS
        </h1>
        <div className="flex flex-row flex-wrap justify-center">
          {[...myOrders].reverse().map((item) => (
            <Link
              to={`/order/${item._id}`}
              className="flex flex-col items-start mb-2 mx-2 rounded-md bg-gray-100 p-4 w-fit h-fit hover:bg-gray-200"
            >
              <div>
                <div>
                  <div className="flex items-centermb-1 ">
                    <CheckBadgeIcon className="h-5 w-5 text-black mr-2" />
                    <p className="text-sm text-black ">
                      <span className="tex-sm mr-1">₹{item.totalPrice}</span>
                      Prepaid
                    </p>
                  </div>

                  <p
                    className={`mb-2 text-sm ${
                      item.orderStatus === "Delivered" ? "font-bold" : ""
                    }`}
                  >
                    Order {item.orderStatus}
                  </p>
                </div>
              </div>
              {item.orderItems.map((order) => (
                <div className="flex mb-2">
                  <div>
                    <img
                      src={order.image}
                      alt=""
                      className="w-40 md:h-40 h-24"
                    />
                  </div>
                  <div className="ml-4">
                    <h6 className="text-gray-500 text-xs">
                      ORDER ID - {order._id.toUpperCase()}
                    </h6>
                    <div className="font-serif md:text-xl text-lg">
                      {order.name}
                    </div>
                    <div className="text-sm">Quantity - {order.quantity}</div>
                  </div>
                </div>
              ))}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
