import { SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import classes from "./Form.module.css";
import { Alert, Space } from "antd";

import { Formik, Form, Field } from "formik";

import { Link, useNavigate } from "react-router-dom";
import {
  handleLogin,
  Confirmed,
  Loading,
  Errors,
  clearErrors,
} from "../../Redux/Slices/UserSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { loginData } from "../../Services/Interfaces/loginUser";
import Model from "../Model/Model";
import SocialMediaButtons from "../SocialMedia/SocialMediaButtons/SocialMediaButtons";

type PropsType = {
  switchForm: React.Dispatch<SetStateAction<boolean>>;
};

interface MyFormValues {
  email: string;
  password: string;
}

function LoginForm(props: PropsType) {
  const initialValues: MyFormValues = {
    email: "",
    password: "",
  };

  const loading = useAppSelector(Loading);
  const { loginError } = useAppSelector(Errors);
  const { loginConfirmed } = useAppSelector(Confirmed);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loginConfirmed) {
      navigate("/dashboard");
    }
  }, [loginConfirmed, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const [isPassVisible, setPassVisible] = useState(false);

  const switchToForget = () => {
    props.switchForm(false);
  };

  const switchVisibility = () => {
    setPassVisible(!isPassVisible);
  };

  async function submitForm(values: MyFormValues) {
    const data: loginData = {
      username: values.email,
      password: values.password,
    };
    dispatch(handleLogin(data));
  }

  const signupSchema = Yup.object().shape({
    email: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Filed Required"),
    password: Yup.string().required("Filed required"),
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={signupSchema}
      >
        {({ errors, touched }) => (
          <Form className="px-3 justify-content-start my-md-auto my-3 mx-auto px-lg-5 bg-white mx-lg-5 border d-flex flex-column gap-2 p-5 rounded-4 w-lg-50 w-75 flex-start">
            <div
              className={`d-flex flex-column align-items-center ${classes.formTitle}`}
            >
              <img srcSet="./images/loginlock.png" alt="" />
              <h2>Login</h2>
            </div>
            <label className="d-flex" htmlFor="email">
              Email or Phone
            </label>
            <div className="mb-3 position-relative">
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

            <label className="d-flex mt-2" htmlFor="password">
              Password
            </label>
            <div className={classes.passwordContainer}>
              <Field
                id="password"
                type={isPassVisible ? "text" : "password"}
                className={`rounded-3 p-2 w-100 form-control shadow-none ${
                  touched.password && errors.password && "is-invalid"
                }`}
                name="password"
                placeholder="Password"
              />
              {!isPassVisible && (
                <i
                  style={{
                    right: errors.password ? "2rem" : "1rem",
                  }}
                  onClick={switchVisibility}
                  className="fa-regular fa-eye-slash"
                ></i>
              )}
              {isPassVisible && (
                <i
                  style={{
                    right: errors.password ? "2rem" : "1rem",
                  }}
                  onClick={switchVisibility}
                  className="fa-regular fa-eye"
                ></i>
              )}
              {errors.password && touched.password ? (
                <div className={classes.error}>{errors.password}</div>
              ) : null}
            </div>

            {loginError && (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Alert message={"invalid username or password"} type="error" />
              </Space>
            )}

            <div className="d-flex justify-content-between mt-3 flex-lg-row flex-column">
              <button
                type="submit"
                className={`rounded-3 d-inline-block py-1 px-5 ${classes.submit}`}
              >
                {loading.loginLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}
              </button>
              <div className="d-flex flex-column align-items-center mt-2 mt-lg-0">
                <button className={classes.forget} onClick={switchToForget}>
                  Forget password
                </button>
                <Model
                  classCustom="createBtnModel"
                  clickString="Create Account"
                ></Model>
              </div>
            </div>

            <SocialMediaButtons formType={"login"} />

            <div className="d-flex justify-content-center">
              Back to &nbsp;<Link to={"/"}>Home</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
