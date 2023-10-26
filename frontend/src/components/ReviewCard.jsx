import React from 'react'
import "../styles/reviewCard.css"
import profilePng from "../Assets/profile.png"
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({review}) => {
  
  const options = {
    edit: false,
    count: 5,
    size: 20,
    // size: window.innerWidth < 670 ? 25 : 25,
    isHalf: true,
    value: review?.rating,
    activeColor: "#3a9dff",
  };
  return (
   <div className="reviewCard">
    <img src={profilePng} alt="User" />
    <p>{review.name}</p>
    <ReactStars {...options}/>
    <span>{review.comment}</span>
   </div>
  )
}

export default ReviewCard