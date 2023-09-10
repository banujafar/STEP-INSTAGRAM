import React from "react";
import InstagramLogo from "../../components/auth/InstagramLogo";
import { Formik, Form } from "formik";
import {  Link, useNavigate } from "react-router-dom";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";
import { registerSchema } from "../../validation/registerSchema";
import { useRegisterMutation } from "../../store/api/authApiSlice";
import InstagramLoader from "../../components/loaders/InstagramLoader";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, {isLoading}] = useRegisterMutation();
  const handleSubmit = async(values, actions) => {

    try {
      const data = await register(values).unwrap();
  
      dispatch(
        setCredentials({ token: data.token, username: values.username })
      );
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.data.details);
    } 
  };
  return isLoading ? (
    <InstagramLoader />
  ) : (
    <div className="space-y-4 w-[375px]">
      <div className="p-12 flex flex-col border   w-full">
        <InstagramLogo />
        <p className="text-center -mt-3 mb-4 font-semibold text-gray-500">
          Sign up to see photos and videos from your friends.
        </p>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            password: "",
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form autoComplete="off" className="space-y-2">
              <Input label="First Name" name="lastName" />
              <Input label="Last Name" name="firstName" />
              <Input label="Username" name="username" />
              <Input label="Password" value="password" name="password" />
              <p className="text-xs text-gray-500 text-center pt-2">
                People who use our service may have uploaded your contact
                information to Instagram .
              </p>
              <p className="text-xs text-gray-500 text-center py-2">
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy .
              </p>
              <Button disabled={!dirty || !isValid || isSubmitting}>
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-full p-4 border">
        <p className="text-center ">
          Have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-[#0095F6] font-semibold"
            replace={true}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
