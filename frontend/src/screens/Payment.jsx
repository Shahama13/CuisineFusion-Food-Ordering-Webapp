import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import CheckoutSteps from "../components/CheckoutSteps";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import {
  CreditCardIcon,
  CalendarIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const client_secret = data.client_secret;
      
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          navigate("/success");
        } else {
          toast.error("Some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <CheckoutSteps activeStep={2} />
      <div className="flex flex-col w-full h-full items-center mt-6">
        <form onSubmit={submitHandler} className="w-[80%] sm:w-[60%] md:w-1/3">
          <div className="flex mb-3">
            <CreditCardIcon class="h-6 w-6 text-black absolute mt-4 ml-2  " />
            <CardNumberElement className="border-1 w-full border-black pl-9 py-4 font-sans" />
          </div>
          <div className="flex mb-3">
            <CalendarIcon class="h-6 w-6 text-black absolute mt-4 ml-2  " />
            <CardExpiryElement className="border-1 w-full border-black pl-9 py-4" />
          </div>
          <div className="flex mb-3">
            <KeyIcon class="h-6 w-6 text-black absolute mt-4 ml-2  " />
            <CardCvcElement className="border-1 w-full border-black pl-9 py-4" />
          </div>
          <button
            className="font-serif p-2 w-full text-white bg-black mt-5 hover:bg-gray-700"
            type="submit"
            ref={payBtn}
          >
            {`Pay  ₹${orderInfo && orderInfo.total}`}
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
