import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import CheckoutSteps from "../components/CheckoutSteps";
import { HmacSHA256 } from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../Reducers/order";
import { createOrder } from "../Actions/order";
import MetaData from "../MetaData";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);

  const [show, setShow] = useState(false);

  const orderr = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.gst,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.total,
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    checkoutHandler();
  }, [error, dispatch]);

  const checkoutHandler = async () => {
    const {
      data: { key, secret },
    } = await axios.get("/api/v1/get-key");
    const {
      data: { order },
    } = await axios.post("/api/v1/checkout", {
      amount: orderInfo.total,
    });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Fabizo",
      description: "Online Transaction",

      order_id: order.id,

      handler: function (response) {
        const body =
          response.razorpay_order_id + "|" + response.razorpay_payment_id;

        const expected_signature = HmacSHA256(
          body,
          secret,
        ).toString();

        const isAuthentic = expected_signature === response.razorpay_signature;
        if (isAuthentic) {
          orderr.paymentInfo = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            status: "Succeeded",
          };
          setShow(false);
          dispatch(createOrder(orderr));
          navigate("/success");
        } else {
          return;
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: shippingInfo.phoneNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#000000",
      },
    };
    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      setShow(true);
    });

    razor.open();
  };

  return (
    <>
      <CheckoutSteps activeStep={2} />
      {show && (
        <>
          <MetaData title="Payment" />
          <div className="flex flex-col w-full  items-center mt-24 ">
            <p className="font-serif m-3 text-black text-2xl">
              Payment Cancelled!
            </p>
            <button className="bg-black px-12 py-2 text-white">Retry</button>
          </div>
        </>
      )}
    </>
  );
};

export default Payment;
