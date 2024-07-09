import React, { SetStateAction, useEffect } from "react";
import { Alert, Space } from "antd";
import * as Yup from "yup";
import classes from "./Form.module.css";

import { Formik, Form, Field } from "formik";
import {
  clearErrors,
  Errors,
  forgetPassword,
  Loading,
  UserVerification,
} from "../../Redux/Slices/UserSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { useNavigate } from "react-router-dom";

type PropsType = {
  switchForm: React.Dispatch<SetStateAction<boolean>>;
};
type SubmitType = {
  email: string;
};

function ForgetPasswordForm(props: PropsType) {
  const initialValues: SubmitType = {
    email: "",
  };
  const { loginLoading } = useAppSelector(Loading);
  const navigate = useNavigate();
  const { forgetPasswordVerification } = useAppSelector(UserVerification);
  const dispatch = useAppDispatch();
  const { loginError } = useAppSelector(Errors);

  useEffect(() => {
    if (forgetPasswordVerification) {
      navigate("/auth/verify-email");
    }
  }, [forgetPasswordVerification, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  const switchToLogin = () => {
    props.switchForm(true);
  };

  const submitForm = async (values: SubmitType) => {
    const email: string = values.email;
    await dispatch(forgetPassword(email));
  };

  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
        validationSchema={signupSchema}
      >
        {({ errors, touched }) => (
          <Form className="px-3 justify-content-start my-auto mx-auto px-lg-5 bg-white mx-lg-5 border d-flex flex-column gap-2 p-5 rounded-4 w-lg-50 w-75 flex-start">
            <div
              className={`d-flex flex-column align-items-center ${classes.formTitle}`}
            >
              <img srcSet="./images/loginlock.png" alt="" />
              <h2>Forgot password</h2>
              <p className="text-center">
                Enter the email address or phone number you use on website.
                We'll send you a link to reset your password.
              </p>
            </div>
            <label className="d-flex" htmlFor="email">
              Email or Phone
            </label>
            <div className="position-relative mb-3">
              <Field
                id="email"
                name="email"
                type="text"
                className={`rounded-3 p-2 form-control shadow-none ${
                  touched.email && errors.email && "is-invalid"
                }`}
                placeholder="Email or Phone"
              />
              {errors.email && touched.email ? (
                <div className={classes.error}>{errors.email}</div>
              ) : null}
            </div>
            {loginError && (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Alert message={"invalid username or password"} type="error" />
              </Space>
            )}

            <div className="d-flex justify-content-between mt-3 flex-lg-row flex-column">
              {loginLoading ? (
                <button
                  type="button"
                  className={`rounded-3 d-inline-block py-1 px-5 w-50 m-auto ${classes.submit}`}
                >
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className={`rounded-3 d-inline-block py-2 px-5 w-50 m-auto ${classes.submit}`}
                >
                  Send
                </button>
              )}
            </div>

            <div className="d-flex justify-content-center">
              Back to &nbsp;
              <button
                type="button"
                className={classes.forget}
                onClick={() => {
                  switchToLogin();
                }}
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ForgetPasswordForm;
