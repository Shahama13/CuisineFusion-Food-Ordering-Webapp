import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../Reducers/profile";
import { loadUser, resetPassword } from "../Actions/user";
import toast from "react-hot-toast";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const PasswordReset = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.profile);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(params.token, newPassword, confirmPassword));
    await dispatch(loadUser());
    if (user) {
      navigate("/");
    }
    setNewPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center w-[100vw] h-[100vh] max-w-[100%] bg-white fixed top-0 left-0 z-10">
          <form
            className="flex flex-col w-full mt-0 sm:mt-5 md:w-1/2  max-w-lg p-4 pt-3 sm:pt-12 pb-8 rounded-md bg-white shadow-xl "
            onSubmit={handleSubmit}
          >
            <div className="relative mb-3">
              <LockClosedIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
              <input
                className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="relative mb-3">
              <LockClosedIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
              <input
                className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
                type="password"
                placeholder="Confirm Password"
                name="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              disabled={
                !confirmPassword ||
                !newPassword ||
                confirmPassword !== newPassword
              }
              className="bg-black w-full text-white font-serif py-2 mt-2"
              type="submit"
            >
              RESET
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PasswordReset;
