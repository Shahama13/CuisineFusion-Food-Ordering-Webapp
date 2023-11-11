import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import MetaData from "../MetaData";

const NotFound = () => {

  const navigate = useNavigate();
  return (
    <>
      <MetaData title="Page Not Found" />
      <div className="flex px-2 md:p-0 flex-col w-full  items-center justify-center">
        <ExclamationCircleIcon className="md:h-32 md:w-32 h-16 w-16 mt-6 text-black md:mb-2 mb-0" />
        <h1 className="font-serif text-center md:text-2xl text-lg font-bold text-black">
          PAGE NOT FOUND
        </h1>
        <button
          onClick={() => navigate("/products")}
          className="font-serif p-2 md:px-9 px-3 rounded-md text-white w-fit bg-black md:mt-5 mt-3 text-sm md:text-base hover:bg-gray-700"
        >
          GO TO HOMEPAGE
        </button>
      </div>
    </>
  );
};

export default NotFound;
