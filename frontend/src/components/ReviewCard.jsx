import React from "react";
import Rating from "@mui/material/Rating";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const ReviewCard = ({ review }) => {
  const options = {
    size: "small",
    value: review?.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="flex flex-row items-center space-x-3 py-4 pl-2 pr-10 w-fit rounded-md m-2">
      <UserCircleIcon className="h-16 w-16 text-gray-200" />
      <div>
        <p className="text-sm text-gray-600">{review.name}</p>
        <Rating {...options} style={{ color: "black", marginBottom: "0px" }} />
        <p className="text-gray-800 -mt-3">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
