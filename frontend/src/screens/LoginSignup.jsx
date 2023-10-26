import React, { useEffect, useRef, useState } from "react";
import "../styles/loginSignup.css";
import Loader from "../components/Loader";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Link, useNavigate } from "react-router-dom";
import profilePng from "../Assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../Reducers/user";
import { login, register } from "../Actions/user";
import toast from "react-hot-toast";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
    
  }, [error, dispatch, navigate, isAuthenticated]);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    setLoginEmail("");
    setLoginPassword("");
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name,email,password,avatar));
  };

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
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
    <div className="LoginSignUpContainer">
      {loading ? (
        <Loader />
      ) : (
        <div className="loginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form ref={loginTab} className="loginForm" onSubmit={loginSubmit}>
            <div className="loginEmail">
              <EmailOutlinedIcon />
              <input
                type="email"
                placeholder="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="loginPassword">
              <KeyOutlinedIcon />
              <input
                type="password"
                placeholder="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <Link to={"/password/forgot"}>Fogot Password?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>

          <form
            ref={registerTab}
            className="signUpForm"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <TagFacesIcon />
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <EmailOutlinedIcon />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={registerDataChange}
                required
              />
            </div>
            <div className="signUpPassword">
              <KeyOutlinedIcon />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={registerDataChange}
                required
              />
            </div>

            <div className="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>

            <input type="submit" value="Register" className="SignUpBtn" />
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
