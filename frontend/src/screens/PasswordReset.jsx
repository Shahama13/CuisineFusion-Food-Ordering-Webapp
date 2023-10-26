import React, { useEffect, useState } from "react";
import "../styles/updateProfile.css";
import Loader from "../components/Loader";
import KeyIcon from "@mui/icons-material/Key";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../Reducers/profile";
import { loadUser, resetPassword } from "../Actions/user";
import toast from "react-hot-toast";

const PasswordReset = () => {
    const params = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.profile);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(resetPassword(params.token,newPassword, confirmPassword));
    await dispatch(loadUser())
    if(user){
        navigate("/")
    }
    setNewPassword("")
    setConfirmPassword("")
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
        <>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2>Reset Password</h2>
              <form className="updateProfileForm" onSubmit={handleSubmit}>
               
                <div className="updateProfileEmail">
                  <KeyIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="updateProfileEmail">
                  <KeyIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <input
                disabled={!confirmPassword || !newPassword || confirmPassword!==newPassword}
                  type="submit"
                  value="Reset"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PasswordReset;
