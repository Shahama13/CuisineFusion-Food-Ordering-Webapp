import React, { useState, useEffect } from "react";
import "../styles/forgotPassword.css";
import Loader from "../components/Loader";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../Reducers/profile";
import toast from "react-hot-toast";
import { forgotPassword } from "../Actions/user";

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
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2>Forgot Password</h2>
              <form className="forgotPasswordForm" onSubmit={handleSubmit}>
                <div className="forgotPasswordEmail">
                  <EmailOutlinedIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <input
                  type="submit"
                  value="Send Email"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
