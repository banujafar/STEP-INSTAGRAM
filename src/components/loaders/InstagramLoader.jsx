import React from "react";
import {BsInstagram} from "react-icons/bs"
const InstagramLoader = () => {
  return (
    <div className="flex w-full h-full fixed z-50 bg-white items-center justify-center text-pink-500">
      <BsInstagram size={150} />
    </div>
  );
};

export default InstagramLoader;
