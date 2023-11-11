import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, getOrderDetails, updateOrder } from "../Actions/order";
import { Link, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { clearErrors, successReset } from "../Reducers/order";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Rating } from "@mui/material";
import { addReview } from "../Actions/product";
import { clearReviewError, reviewReset } from "../Reducers/product";
import MetaData from "../MetaData";

const OrderDetails = () => {
  const location = useLocation();
  const a = location?.search?.split("=")[1];
  const dispatch = useDispatch();
  const params = useParams();

  const { orderDetails, orderLoading, error } = useSelector(
    (state) => state.order
  );

  const { success: updateSuccess, loading } = useSelector(
    (state) => state.adminOrder
  );

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [id, setId] = useState("");
  const [category, setCatgory] = useState(orderDetails?.orderStatus);

  const { success, error: reviewError } = useSelector((state) => state.review);

  useEffect(() => {
    if (success) {
      toast.success("Review added!");
      dispatch(reviewReset());
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearReviewError());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateSuccess) {
      dispatch(successReset());
    }
    dispatch(getOrderDetails(params.id));
    if (orderDetails._id === params.id) {
      setCatgory(orderDetails?.orderStatus);
    }
  }, [
    params,
    error,
    dispatch,
    orderDetails._id,
    success,
    reviewError,
    updateSuccess,
    orderDetails.orderStatus,
  ]);

  return orderLoading || loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="Orders Details" />
      {orderDetails.orderItems && (
        <div className="p-0 md:px-6">
          <h1 className="font-serif text-center text-xl sm:text-2xl font-bold mt-4 text-slate-700">
            ORDER DETAILS
          </h1>
          <div className=" bg-gray-100 mx-2 pb-2 my-3">
            <h3 className="font-serif text-start px-4 pt-3  text-lg md:text-xl text-slate-600">
              ORDER ITEMS
            </h3>
            {orderDetails.orderItems &&
              orderDetails.orderItems.map((item) => (
                <div className=" flex mb-2 py-2 px-4">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 md:w-32 w-20"
                    />
                  </div>
                  <div className="sm:ml-4 ml-2">
                    <Link
                      to={`/product/${item.product}`}
                      className="font-serif "
                    >
                      {item.name}
                    </Link>
                    <p className="my-2 text-[10px] sm:text-base ">
                      {item.price} X{" "}
                      <span className="border-1 border-black md:px-2 py-1 md:m-2 m-1 px-1 text-[10px] sm:text-base ">
                        {item.quantity}
                      </span>
                      = ₹{item.price * item.quantity}
                    </p>
                    {orderDetails.orderStatus === "Delivered" && (
                      <button
                        className="mt-2 bg-black text-white py-1 px-4 hover:bg-gray-600"
                        onClick={() => {
                          setOpen(true);
                          setId(item.product);
                        }}
                      >
                        Review
                      </button>
                    )}
                    <Dialog
                      open={open}
                      onClose={() => {
                        setOpen((prev) => !prev);
                        setId("");
                        setComment("");
                        setRating(0);
                      }}
                      aria-labelledby="simple-dialog-title"
                    >
                      <div className="font-serif text-xl pt-4 pl-6">
                        Submit Review
                      </div>
                      <DialogContent className="flex flex-col">
                        <Rating
                          style={{ color: "black" }}
                          className="w-full mb-4"
                          name="simple-controlled"
                          value={rating}
                          onChange={(event, newValue) => {
                            setRating(newValue);
                          }}
                          size="large"
                        />
                        <textarea
                          className="bg-gray-100 outline-none p-2"
                          cols={30}
                          rows={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <button
                          onClick={() => {
                            setOpen(false);
                            setRating(0);
                            setComment("");
                            setId("");
                          }}
                          className="text-red-600 bg-gray-100 py-1 px-2 mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          className="text-black bg-gray-100 py-1 px-2 mr-4"
                          onClick={async () => {
                            await dispatch(addReview(rating, comment, id));
                            setOpen(false);
                            setRating(0);
                            setComment("");
                          }}
                          disabled={rating === 0 || !comment}
                        >
                          Submit
                        </button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              ))}
          </div>
          <div className=" bg-gray-100 mx-2 p-2 flex items-center justify-between my-3">
            <h3 className="font-serif text-start text-lg md:text-xl text-slate-600 ">
              ORDER STATUS
            </h3>
            {a ? (
              <div className="flex items-center justify-center">
                {orderDetails.orderStatus === "Delivered" ? (
                  <span className="text-[10px] sm:text-base ">
                    {orderDetails.orderStatus}
                  </span>
                ) : (
                  <>
                    <select
                      value={category}
                      className="outline-none bg-slate-100 rounded-md p-3 text-[10px] sm:text-sm "
                      onChange={(e) => setCatgory(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      onClick={() => {
                        dispatch(updateOrder(orderDetails._id, category));
                        dispatch(getAllOrders());
                      }}
                      className="bg-black text-white  text-xs ml-1 p-1 hover:bg-gray-700"
                    >
                      Change Status
                    </button>
                  </>
                )}
              </div>
            ) : (
              <span className="text-[10px] sm:text-base ">
                {orderDetails.orderStatus}
              </span>
            )}
          </div>

          <div className=" bg-gray-100 mx-2 p-2 flex items-center justify-between my-3">
            <h3 className="font-serif text-start text-lg md:text-xl text-slate-600">
              ORDERED ON
            </h3>
            <p className="text-[10px] sm:text-base ">
              {orderDetails.createdAt.slice(0, 10)}
            </p>
          </div>

          <div className=" bg-gray-100 mx-2 p-2 my-3">
            <h3 className="font-serif text-start mb-2 text-lg md:text-xl text-slate-600">
              PAYMENT INFO
            </h3>
            <div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Id</p>
                <p>{orderDetails.paymentInfo.razorpay_order_id}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Paid at</p>
                <p>{orderDetails.paidAt.slice(0, 10)}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Status</p>
                <p>{orderDetails.paymentInfo.status}</p>
              </div>
            </div>
          </div>

          <div className=" bg-gray-100 mx-2 p-2 my-3">
            <h3 className="font-serif text-start mb-2 text-slate-600  text-lg md:text-xl">
              SHIPPING DETAILS
            </h3>
            <div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Name</p>
                <p>{orderDetails.user.name}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Email</p>
                <p>{orderDetails.user.email}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Phone number</p>
                <p>{orderDetails.shippingInfo.phoneNo}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p> Address </p>
                <p>
                  {orderDetails.shippingInfo.address},
                  {orderDetails.shippingInfo.city},
                  {orderDetails.shippingInfo.pinCode},
                  {orderDetails.shippingInfo.country}
                </p>
              </div>
            </div>
          </div>

          <div className=" bg-gray-100 mx-2 p-2 mt-3 mb-6">
            <h3 className="font-serif text-start mb-2  text-lg md:text-xl text-slate-600">
              PRICE DETAILS
            </h3>
            <div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Subtotal</p>
                <p>₹{orderDetails.itemsPrice}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Shipping Charges</p>
                <p>
                  {orderDetails.shippingPrice === 0 ? "" : "₹"}
                  {orderDetails.shippingPrice}
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p>Tax</p>
                <p>₹{orderDetails.taxPrice}</p>
              </div>
              <div className="flex items-center justify-between text-[10px] sm:text-base ">
                <p className="font-serif sm:text-lg text-base text-slate-900">
                  Total Price
                </p>
                <p className="font-serif sm:text-lg text-base text-slate-900">
                  ₹{orderDetails.totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
