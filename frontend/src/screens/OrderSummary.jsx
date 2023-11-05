import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";
import CartItemCard from "../components/CartItemCard";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate= useNavigate()

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/products");
    }
  }, [cartItems,navigate]);
 
   const subTotal =  cartItems.reduce(
       (acc, item) => acc + item.quantity * item.price,
       0
     );
   
   const shippingCharges = subTotal > 999 ? 0 : 200; 
   const gst = 0.02 * subTotal;
   const total = subTotal + shippingCharges + gst;

   const  proccedToPayment = ()=>{
    const data = {
      subTotal,
      shippingCharges,
      gst,
      total,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate("/process/payment");
   }

  return (
    <>
      <CheckoutSteps activeStep={1} />
      <div className="flex flex-col md:flex-row  w-full h-full  p-2 sm:p-6 space-x-7">
        <div className="w-1/2">
          <div className="bg-gray-100 px-3 py-2 mb-4">
            <span className="font-serif text-xl text-center my-2 ">
              Deliver to{" "}
              <span className="font-bold text-base ml-3">{user.name}</span>
            </span>

            <p>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pinCode}, ${shippingInfo.country}`}</p>
            <p>{shippingInfo.phoneNo}</p>
          </div>
          <div>
            {cartItems &&
              cartItems.map((item) => (
                <CartItemCard
                  showCross={false}
                  item={item}
                  key={item.product}
                />
              ))}
          </div>
        </div>
        <div className="w-1/2 px-5 pb-5 bg-gray-100 h-fit flex flex-col">
          <h3 className="font-serif text-xl text-center my-2 ">
            Price Details
          </h3>
          <div className="space-y-2">
            <div className=" w-full flex justify-between">
              <div>Subtotal</div>
              <div>{subTotal}</div>
            </div>
            <div className=" w-full flex justify-between ">
              <div>
                Shipping{" "}
                <span className="text-sm text-red-400">
                  (Free on orders above 999)
                </span>
              </div>
              <div>{shippingCharges}</div>
            </div>
            <div className="w-full  flex justify-between ">
              <div>GST</div>
              <div>{gst}</div>
            </div>
            <div className=" w-full flex justify-between font-bold">
              <div>Total</div>
              <div>{total}</div>
            </div>
          </div>

          <button onClick={proccedToPayment} className="font-serif p-2 text-white bg-black mt-5 hover:bg-gray-700">
            PROCCED TO PAYMENT
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
