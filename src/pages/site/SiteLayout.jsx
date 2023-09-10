import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/site/Header";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {  setCurrentUser } from "../../store/authSlice";



const SiteLayout = () => {
  


  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default SiteLayout;
