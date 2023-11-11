import React from "react";
import Spinner from "../Assets/Spinner.gif";

const Loader = () => {
  return (
    <div
     className="flex items-center justify-center w-full h-[60vh]"
    >
      <img src={Spinner} alt="Loading.."  className="w-20 h-20 sm:h-44 sm:w-44"/>
    </div>
  );
};

export default Loader;
