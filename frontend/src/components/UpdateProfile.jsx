import React, { useEffect, useState } from "react";
import "../styles/updateProfile.css";
import Loader from "./Loader";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { Link, useNavigate } from "react-router-dom";
import profilePng from "../Assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updateProfileReset } from "../Reducers/profile";
import { loadUser, updateProfile } from "../Actions/user";
import toast from "react-hot-toast";
import MetaData from "../MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatar? user.avatar.url : profilePng
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2>Update Profile</h2>
              <form className="updateProfileForm" onSubmit={handleSubmit}>
                <div className="updateProfileName">
                  <TagFacesIcon />
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div className="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleImg}
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

export default UpdateProfile;
