import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/site/Header";


const SiteLayout = () => {
  


  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default SiteLayout;
