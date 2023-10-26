import React, { useEffect, useState } from "react";
import "../styles/updateProfile.css";
import Loader from "../components/Loader";
import KeyIcon from "@mui/icons-material/Key";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePasswordReset } from "../Reducers/profile";
import { updatePassword } from "../Actions/user";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword,newPassword,confirmPassword));
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2>Update Password</h2>
              <form className="updateProfileForm" onSubmit={handleSubmit}>
                <div className="updateProfileName">
                  <PasswordIcon />
                  <input
                    required
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
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

                  type="submit"
                  value="Update"
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

export default UpdatePassword;
