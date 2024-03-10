import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  useSignupUserMutation,
  useSigninUserMutation,
} from "../../features/authentication/authAPI";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authentication/authSlice";

const Form = ({ isSignupPage = false }) => {
  const [signinUser, { isLoading: signinLoading, error: signinError }] =
    useSigninUserMutation();
  const [signupUser, { isLoading: signupLoading, error: signupError }] =
    useSignupUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleFormSubmit = async (values) => {
    try {
      if (isSignupPage) {
        const { data } = await signupUser(values);
        if (data) {
          dispatch(setUser(data));
          navigate("/");
        }
      } else {
        const { data } = await signinUser(values);
        if (data) {
          dispatch(setUser(data));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    ...(isSignupPage && { fullName: "" }),
    email: "",
    password: "",
  };

  const signupSchema = yup.object({
    ...(isSignupPage && {
      fullName: yup
        .string()
        .required("required")
        .min(2, "Minimum 2 letters are required"),
    }),
    email: yup.string().required("required").email("Invalid email"),
    password: yup.string().required("required"),
  });

  return (
    <div className="bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">
          {isSignupPage ? "Welcome" : "Welcome Back"}
        </div>
        <div className="text-xl font-light mb-12">
          {isSignupPage
            ? "Sign up now to get started"
            : "Sign in to get started"}{" "}
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={signupSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
          }) => (
            <form
              className="w-full flex flex-col justify-center items-center"
              onSubmit={handleSubmit}
            >
              {isSignupPage && (
                <Input
                  label="Full Name"
                  name="fullName"
                  placeholder="Full Name"
                  className="mb-6"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  errors={
                    touched.fullName && errors.fullName ? errors.fullName : ""
                  }
                />
              )}
              <Input
                label="Email"
                name="email"
                className="mb-6"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                errors={touched.email && errors.email ? errors.email : ""}
              />
              <Input
                label="Password"
                name="password"
                placeholder="Password"
                className="mb-12"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                errors={
                  touched.password && errors.password ? errors.password : ""
                }
              />
              <Button
                type="submit"
                label={isSignupPage ? "Sign Up" : "Sign In"}
                className="w-1/2"
              />
            </form>
          )}
        </Formik>
        <div className="mt-2 font-medium">
          {isSignupPage
            ? `Already have an account?${" "}`
            : `Don't have an account?${" "}`}

          <Link
            className="text-primary cursor-pointer underline hover:text-blue-700"
            to={isSignupPage ? "/user/sign_in" : "/user/sign_up"}
          >
            {isSignupPage ? "Sign in" : "Sign up"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
