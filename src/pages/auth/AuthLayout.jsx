import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const imagesRef = useRef();

  useEffect(() => {
    let i = 0;
    const handleImages = () => {
      imagesRef.current.children[i].classList.remove("opacity-100");
      imagesRef.current.children[i].classList.add("opacity-0");
      i++;
      if (i === 4) i = 0;
      imagesRef.current.children[i].classList.remove("opacity-0");
      imagesRef.current.children[i].classList.add("opacity-100");
    };
    setInterval(handleImages, 3000);

    return () => {
      clearInterval(handleImages);
    };
  }, []);
  return (
    <section className="flex items-center justify-center h-screen ">
      <div
        ref={imagesRef}
        className="bg-ig-phone relative   bg-[length:29.27rem_39.634375rem] h-[36.321875rem] bg-[-top_left_2.875rem] w-[29.27rem] bg-no-repeat mr-8 "
      >
        <img
          src="/images/screen1.png"
          alt="Screen 1"
          className="absolute top-6 right-[3.8rem] opacity-100 transition duration-1000"
        />
        <img
          src="/images/screen2.png"
          alt="Screen 2"
          className="absolute top-6 right-[3.8rem] opacity-0 transition duration-1000"
        />
        <img
          src="/images/screen3.png"
          alt="Screen 3"
          className="absolute top-6 right-[3.8rem] opacity-0 transition duration-1000"
        />
        <img
          src="/images/screen4.png"
          alt="Screen 4"
          className="absolute top-6 right-[3.8rem] opacity-0 transition duration-1000"
        />
      </div>
      <Outlet />
    </section>
  );
};

export default AuthLayout;
