import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentToken } from "../../store/authSlice";
const PrivateRoute = ({ children }) => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to={"/auth/login"}
        replace={true}
        state={{
          return_url: location?.pathname,
        }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
