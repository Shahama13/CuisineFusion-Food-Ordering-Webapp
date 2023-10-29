import React, {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../Reducers/cart";
import { Country, State, City } from "country-state-city";
import {
  MapIcon,
  GlobeAltIcon,
  PhoneIcon,
  PaperClipIcon,
  HomeIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import CheckoutSteps from "../components/CheckoutSteps";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = async(e) => {
    e.preventDefault();
    if(phoneNo.length<10 || phoneNo.length>10){
      toast.error("Invalid phone number")
      return
    }
   await dispatch(saveShippingInfo({
      address,city,state,country,pinCode,phoneNo
    }))
navigate("/order/summary")
  };

  return (
    <>
      <CheckoutSteps activeStep={0} />
      <div className="flex flex-col w-full h-full items-center mt-6">
        {/* <h2 className="font-serif text-2xl my-4">Address</h2> */}

        <form onSubmit={shippingSubmit} className="w-[80%] sm:w-[60%] md:w-1/3">
          <div className="flex mb-3">
            <GlobeAltIcon class="h-6 w-6 text-black absolute mt-4 ml-2  " />

            <select
              className="border-1 w-full border-black pl-9 py-4 "
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" disabled selected>
                Country
              </option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex mb-3">
            <PhoneIcon class="h-6 w-6 text-black absolute mt-4 ml-2  " />
            <input
              className="border-1 w-full border-black pl-9 py-4"
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          {/* {country && ( */}
          <div className="flex mb-3 ">
            <MapIcon class="h-6 w-6  text-black absolute mt-4 ml-2  " />
            <select
              className="border-1 w-full border-black pl-9 py-4"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="" disabled selected>
                State
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {/* )} */}

          {/* {state && ( */}
          <div className="flex mb-3">
            <MapPinIcon class="h-6 w-6 text-black absolute mt-4 ml-2  " />
            <select
              className="border-1 w-full border-black pl-9 py-4"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="" disabled selected>
                City
              </option>
              {City &&
                City.getCitiesOfState(country, state).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {/* )} */}

          <div className="flex mb-3">
            <PaperClipIcon class="h-6 w-6 text-black absolute mt-4 ml-2  " />
            <input
              className="border-1 w-full border-black pl-9 py-4"
              type="number"
              placeholder="PinCode"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          <div className="flex mb-3">
            <HomeIcon class="h-6 w-6 text-black absolute mt-4 ml-2  " />
            <input
              className="border-1 w-full border-black pl-9 py-4"
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-black text-white hover:bg-gray-700 py-3 mb-6"
            type="submit"
            value="Continue"
            disabled={state ? false : true}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default Address;
