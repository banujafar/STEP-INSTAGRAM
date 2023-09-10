import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/authSlice";
import { useLoginMutation } from "../../store/api/authApiSlice";
import InstagramLoader from "../../components/loaders/InstagramLoader";
import { Form, Formik } from "formik";
import Input from "./Input";
import { loginSchema } from "../../validation/loginSchema";
import Button from "./Button";
import toast from "react-hot-toast";
const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (values, actions) => {
    const {username, password} = values
    try {
      const data = await login({ username, password }).unwrap();

      dispatch(setCredentials({ token: data.token, username }));

      navigate("/");
    } catch (error) {
      
      toast.error(error.data.details)
    }
  };

  return isLoading ? (
    <InstagramLoader />
  ) : (
    <div className="p-12 flex flex-col border w-[375px]  ">
      <span className="h-16 w-auto mb-6 mx-auto">
        <img
          src="/images/instagram-logo.png"
          alt="Instagram Logo"
          className="h-full w-auto"
        />
      </span>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="space-y-2">
            <Input label='Username' name="username"/>
            <Input label='Password' value="password" name="password"/>
            <Button disabled={!dirty || !isValid || isSubmitting} >Log in</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
