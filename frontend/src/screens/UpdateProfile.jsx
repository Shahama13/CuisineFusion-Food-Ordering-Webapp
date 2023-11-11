import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import profilePng from "../Assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updateProfileReset } from "../Reducers/profile";
import { loadUser, updateProfile } from "../Actions/user";
import toast from "react-hot-toast";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";
import MetaData from "../MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatar ? user.avatar.url : profilePng
  );
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email, avatar));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      dispatch(loadUser());
      navigate("/account");
      dispatch(updateProfileReset());
    }
  }, [error, dispatch, user, navigate, isUpdated]);

  return (
    <>
      <MetaData title={`Update Profile`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full items-center justify-center flex flex-col p-8 md:p-0">
          <form
            className="flex flex-col w-full mt-0 sm:mt-5 md:w-1/2  max-w-lg p-4 pt-1 sm:pt-4 pb-8 rounded-md bg-white shadow-xl "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center mb-3">
              <img
                src={avatarPreview}
                className="h-20 w-20 rounded-full"
                alt="Avatar Preview"
              />
              <input
                className="text-sm text-gray-400"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleImg}
              />
            </div>

            <div className="relative mb-3">
              <UserIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
              <input
                className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
                required
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              UPDATE PROFILE
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
