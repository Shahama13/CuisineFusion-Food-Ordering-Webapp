import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../Actions/order";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { clearErrors } from "../Reducers/order";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Rating } from "@mui/material";
import { addReview } from "../Actions/product";
import { clearReviewError, reviewReset } from "../Reducers/product";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { orderDetails, orderLoading, error } = useSelector(
    (state) => state.order
  );
  const { success, error: reviewError } = useSelector((state) => state.review);

  useEffect(() => {
    if (success) {
      toast.success("Review added successfully");
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
    dispatch(getOrderDetails(params.id));
  }, [params, error, dispatch, success, reviewError]);

  return orderLoading ? (
    <Loader />
  ) : (
    orderDetails.orderItems && (
      <div className="p-0 md:px-6">
        <h1 className="font-serif text-center text-2xl font-bold my-4 text-black">
          ORDER DETAILS
        </h1>
        <div className=" bg-gray-100 mx-2 pb-2 my-3">
          <h3 className="font-serif text-start px-4 pt-3 text-xl">
            ORDER ITEMS
          </h3>
          {orderDetails.orderItems &&
            orderDetails.orderItems.map((item) => (
              <div className=" flex mb-2 py-2 px-4">
                <div>
                  <img src={item.image} alt={item.name} className="h-32 w-32" />
                </div>
                <div className="ml-4">
                  <Link to={`/product/${item.product}`} className="font-serif ">
                    {item.name}
                  </Link>
                  <p className="my-2">
                    {item.price} X{" "}
                    <span className="border-1 border-black px-2 py-1 m-2">
                      {item.quantity}
                    </span>
                    = ₹{item.price * item.quantity}
                  </p>
                  {orderDetails.orderStatus === "Delivered" && (
                    <button
                      className="mt-2 bg-black text-white py-1 px-4 hover:bg-gray-600"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Review
                    </button>
                  )}
                  <Dialog
                    // className="w-6/12"
                    open={open}
                    onClose={() => {
                      setOpen((prev) => !prev);
                    }}
                    aria-labelledby="simple-dialog-title"
                  >
                    <div className="font-serif text-xl pt-4 pl-6">
                      Submit Review
                    </div>
                    <DialogContent className="flex flex-col">
                      <Rating
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
                          setRating(0)
                          setComment("")
                        }}
                        className="text-red-600 bg-gray-100 py-1 px-2 mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        className="text-black bg-gray-100 py-1 px-2 mr-4"
                        onClick={() => {
                          dispatch(addReview(rating, comment, item.product));
                          setOpen(false);
                          setRating(0)
                          setComment("")
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
          <h3 className="font-serif text-start  text-xl">ORDER STATUS</h3>
          <span>{orderDetails.orderStatus}</span>
        </div>

        <div className=" bg-gray-100 mx-2 p-2 flex items-center justify-between my-3">
          <h3 className="font-serif text-start  text-xl">ORDERED ON</h3>
          <p>{orderDetails.createdAt.slice(0, 10)}</p>
        </div>

        <div className=" bg-gray-100 mx-2 p-2 my-3">
          <h3 className="font-serif text-start mb-2  text-xl">PAYMENT INFO</h3>
          <div>
            <div className="flex items-center justify-between">
              <p>Id</p>
              <p>{orderDetails.paymentInfo.id}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Paid at</p>
              <p>{orderDetails.paidAt.slice(0, 10)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Status</p>
              <p>{orderDetails.paymentInfo.status}</p>
            </div>
          </div>
        </div>

        <div className=" bg-gray-100 mx-2 p-2 my-3">
          <h3 className="font-serif text-start mb-2  text-xl">
            SHIPPING DETAILS
          </h3>
          <div>
            <p>{orderDetails.user.name}</p>
            <p>Email - {orderDetails.user.email}</p>
            <p>Phone number - {orderDetails.shippingInfo.phoneNo}</p>
            <p>
              Address -{orderDetails.shippingInfo.address},
              {orderDetails.shippingInfo.city},
              {orderDetails.shippingInfo.pinCode},
              {orderDetails.shippingInfo.country}
            </p>
          </div>
        </div>

        <div className=" bg-gray-100 mx-2 p-2 mt-3 mb-6">
          <h3 className="font-serif text-start mb-2  text-xl">PRICE DETAILS</h3>
          <div>
            <div className="flex items-center justify-between">
              <p>Subtotal</p>
              <p>₹{orderDetails.itemsPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Shipping Charges</p>
              <p>
                {orderDetails.shippingPrice === 0 ? "" : "₹"}
                {orderDetails.shippingPrice}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Tax</p>
              <p>₹{orderDetails.taxPrice}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-serif text-lg">Total Price</p>
              <p className="font-serif text-lg">₹{orderDetails.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderDetails;
