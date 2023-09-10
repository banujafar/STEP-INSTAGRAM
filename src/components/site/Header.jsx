import React, { useCallback, useEffect } from "react";
import SearchInput from "./SearchInput";
import { Form, Formik } from "formik";
import { searchSchema } from "../../validation/searchSchema";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../../store/api/userApiSlice";
import { setCurrentUser } from "../../store/authSlice";
import InstagramLoader from "../loaders/InstagramLoader";
const Header = () => {
  const { username } = useSelector((state) => state.auth);

  const { data: user, isLoading, isError } = useGetCurrentUserQuery(username);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    const { searchValue } = values;
    console.log(searchValue);
  };

  const clearSearchValue = useCallback((setFieldValue) => {
    setFieldValue("searchValue", "");
  }, []);

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setCurrentUser(user?.data));
    }
  }, [isLoading, dispatch, user?.data, isError]);

  if (isLoading) return <InstagramLoader/>;
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

        {/* SEARCH INPUT */}
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            searchValue: "",
          }}
          validationSchema={searchSchema}
        >
          {({ dirty, isValid, setFieldValue }) => (
            <Form className="h-9">
              <SearchInput
                name="searchValue"
                clearSearchValue={() => clearSearchValue(setFieldValue)}
              />
              <button
                type="submit"
                className="hidden"
                disabled={!isValid || !dirty}
              />
            </Form>
          )}
        </Formik>

        {/* Navigation */}
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
