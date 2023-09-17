import React, { useCallback, useEffect } from "react";

import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";
import { setCurrentUser } from "../../store/authSlice";
import InstagramLoader from "../loaders/InstagramLoader";
import { IoAdd } from "react-icons/io5";
import { handleAppendModal } from "../../utils/modal";
const Header = () => {
  const { username } = useSelector((state) => state.auth);

  const { data: user, isLoading, isError } = useGetCurrentUserQuery(username);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setCurrentUser(user?.data));
    }
  }, [isLoading, dispatch, user?.data, isError]);

  if (isLoading) return <InstagramLoader />;
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto w-3/5 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link to={"/"} className="h-10 w">
          <img
            src="/images/instagram-logo.png"
            alt="Instagram logo"
            className="w-auto h-full"
          />
        </Link>

        <button
          onClick={() => handleAppendModal("add-post")}
          className="border-2 rounded-md border-black hover:bg-black hover:text-white transition-all"
        >
          <IoAdd size={32} />
        </button>

        {/* Navigation */}
        <Navbar username={username} />
      </div>
    </header>
  );
};

export default Header;
