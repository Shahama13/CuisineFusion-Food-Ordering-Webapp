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
    <div className="flex flex-col justify-start items-start space-x-3 md:py-4 md:pl-2 md:pr-10 p-2 w-fit rounded-md m-1">
      <div className="flex items-center justify-center">
        <UserCircleIcon className="h-10 w-19 text-gray-200" />

        <p className="text-[15px] md:text-base text-gray-600">{review.name}</p>
      </div>
      <Rating {...options} style={{ color: "black", marginBottom: "0px" }} />
      <p className="text-gray-800 text-[12px] md:text-base leading-2">
        {review.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
