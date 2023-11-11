import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profilePng from "../Assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../Reducers/user";
import { login, register } from "../Actions/user";
import toast from "react-hot-toast";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import MetaData from "../MetaData";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profilePng);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? location.search.split("=")[1] : "account";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [error, dispatch, location, navigate, isAuthenticated, redirect]);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    setLoginEmail("");
    setLoginPassword("");
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, avatar));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="w-full items-center justify-center flex flex-col p-8 md:p-0">
      {loading ? (
        <Loader />
      ) : showLogin ? (
        <>
          <MetaData title="Login" />
          <form
            className="flex flex-col w-full mt-0 sm:mt-5 md:w-1/2  max-w-lg p-4 pt-3 sm:pt-12 pb-8 rounded-md bg-white shadow-xl "
            onSubmit={loginSubmit}
          >
            <div className="relative mb-3">
              <EnvelopeIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
              <input
                className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative mb-3">
              <LockClosedIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
              <input
                className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <Link
              className="mb-6 self-end text-sm hover:text-blue-500 text-black"
              to={"/password/forgot"}
            >
              Forgot Password?
            </Link>
            <button
              className="bg-black w-full text-white font-serif py-2 mt-2"
              type="submit"
            >
              LOGIN
            </button>
          </form>

          <p
            onClick={() => setShowLogin(!showLogin)}
            className="cursor-pointer font-bold mt-2"
          >
            Don't have an account?
          </p>
        </>
      ) : (
        <>
          <MetaData title="SignUp" />
          <form
            className="flex flex-col w-full mt-0 sm:mt-5 md:w-1/2  max-w-lg p-4 pt-1 sm:pt-4 pb-8 rounded-md bg-white shadow-xl "
            onSubmit={registerSubmit}
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
                onChange={registerDataChange}
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
                onChange={registerDataChange}
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
                onChange={registerDataChange}
                required
              />
            </div>
            <div className="relative mb-3">
              <LockClosedIcon className=" h-6 w-6 text-black absolute top-[15px] left-3" />
              <input
                className="outline-none bg-slate-100 rounded-md pl-12 py-3 pr-2 w-full"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={registerDataChange}
                required
              />
            </div>

            <button
              className="bg-black w-full text-white font-serif py-2 mt-2"
              type="submit"
            >
              SIGN UP
            </button>
          </form>

          <p
            onClick={() => setShowLogin(!showLogin)}
            className="cursor-pointer font-bold mt-2 mb-6"
          >
            Already have an account?
          </p>
        </>
      )}
    </div>
  );
};

export default LoginSignup;
