import React, { useEffect } from "react";
import MetaData from "../MetaData";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import profilePng from "../Assets/profile.png";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <MetaData title={`${user.name}'s Profile`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="profileContainer">
          <div>
            {user.avatar  ? (
              <img
                src={user.avatar.url ? user.avatar.url : profilePng}
                alt={user.name}
              />
            ):(<AccountCircleIcon/>)}
            <Link to="/me/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
