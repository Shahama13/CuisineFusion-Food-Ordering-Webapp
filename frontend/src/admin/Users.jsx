import React, { useEffect } from "react";
import TopBar from "./TopBar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { getAllUsers } from "../Actions/user";
import toast from "react-hot-toast";
import { clearOrderError } from "../Reducers/order";

const Users = () => {
  const dispatch = useDispatch();

  const { allUsers, loading, error } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllUsers());
    if (error) {
      toast.error(error);
      dispatch(clearOrderError());
    }
  }, [dispatch, error]);

  return (
    <>
      <TopBar />
      <div className="overflow-x-scroll">
        <div className="flex justify-between text-sm sm:text-base mx-3 mb-6  bg-teal-50 overflow-x-scroll min-w-[950px]">
          <div className="w-60 text-center">ID</div>
          <div className="w-36 ">NAME</div>
          <div className="w-60 ">EMAIL</div>
          <div className="w-16 ">ROLE</div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          allUsers?.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center text-xs sm:text-sm  mx-3 mb-2  py-1 bg-blue-50 min-w-[950px]"
            >
              <div className="w-60 space-x-1 flex items-center">
                {user.avatar && (
                  <img
                    src={user.avatar.url}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div className={!user.avatar ? "ml-10" : ""}>{user._id}</div>
              </div>
              <div className="w-36 ">{user.name}</div>
              <div className="w-60 ">{user.email}</div>
              <div className="w-16">{user.role}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Users;
