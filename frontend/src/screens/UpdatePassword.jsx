import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePasswordReset } from "../Reducers/profile";
import { updatePassword } from "../Actions/user";
import toast from "react-hot-toast";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import MetaData from "../MetaData";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      dispatch(updatePasswordReset());
      navigate("/account");
    }
  }, [error, dispatch, navigate, isUpdated]);

  return (
    <>
      <MetaData title={`Update Password`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full items-center justify-center flex flex-col p-8 md:p-0">
          <form
            className="flex flex-col w-full mt-0 sm:mt-5 md:w-1/2  max-w-lg p-4 pt-3 sm:pt-12 pb-8 rounded-md bg-white shadow-xl "
            onSubmit={handleSubmit}
          >
            <div className="relative mb-3">
              <LockOpenIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
              <input
                className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
                required
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

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
              className="bg-black w-full text-white font-serif py-2 mt-2"
              type="submit"
            >
              UPDATE
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
