import React from "react";
import "../styles/reviewCard.css";
import profilePng from "../Assets/profile.png";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ review }) => {
  const options = {
    size: "small",
    value: review?.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComm">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
