import React from "react";
import { useDispatch } from "react-redux";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/authSlice";
import { useLoginMutation } from "../../store/api/authApiSlice";
import InstagramLoader from "../../components/loaders/InstagramLoader";
import { Form, Formik } from "formik";
import Input from "../../components/auth/Input";
import { loginSchema } from "../../validation/loginSchema";
import Button from "../../components/auth/Button";
import toast from "react-hot-toast";
import InstagramLogo from "../../components/auth/InstagramLogo";
const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location  = useLocation()
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (values, actions) => {
    try {
      const data = await login(values).unwrap();
      dispatch(setCredentials({ token: data.token, username: values.username }));
      navigate(location?.state?.return_url || '/', {
        replace: true
      });
    } catch (error) {
 
      toast.error(error.data.details)
    }
  };

  return isLoading ? (
    <InstagramLoader />
  ) : (
    <div className="space-y-4 w-[375px]">

      <div className="p-12 flex flex-col border   w-full">
        <InstagramLogo/>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form autoComplete="off" className="space-y-2">
             <Input label='Username' name="username"/>
              <Input label='Password' value="password" name="password"/>
              <Button disabled={!dirty || !isValid || isSubmitting} >Log in</Button>
            </Form>
          )}
        </Formik>
        
      </div>
      <div className="w-full p-4 border">
        <p className="text-center ">Don't have an account? <Link to={'/auth/register'} className="text-[#0095F6] font-semibold" replace={true}>Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
