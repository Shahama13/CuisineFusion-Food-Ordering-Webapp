import React from "react";

const Footer = () => {
  return (
    <div className="mt-10 bg-white pt-6 h-32 pb-10 relative">
      <div className="bg-black mx-6  h-[1px] mt-8">.</div>
      <img
        src={require("../Assets/white.png")}
        className="w-24 h-18 block m-auto absolute bottom-9 left-[50%]  "
        alt=""
      />
    </div>
  );
};

export default Footer;
