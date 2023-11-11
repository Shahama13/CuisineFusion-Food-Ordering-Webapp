import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../Reducers/profile";
import toast from "react-hot-toast";
import { forgotPassword } from "../Actions/user";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import MetaData from "../MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.profile);

  const [email, setEmail] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
        ) : (
          <>
          <MetaData title="Forgot Password?" />
          <div className="w-full items-center justify-center flex flex-col p-8 md:p-0">
            <form
              className="flex flex-col w-full mt-0 sm:mt-5 md:w-1/2  max-w-lg p-4 pt-3 sm:pt-12 pb-8 rounded-md bg-white shadow-xl "
              onSubmit={handleSubmit}
            >
              <div className="relative mb-3">
                <EnvelopeIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
                <input
                  className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                className="bg-black w-full text-white font-serif py-2 mt-2"
                type="submit"
              >
                SEND RESET TOKEN
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
