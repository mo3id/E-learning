import { useState } from "react";

import * as Yup from "yup";
import classes from "./ChangePass.module.css";

import { Formik, Form, Field } from "formik";
import { setNewPassword, Loading } from "../../Redux/Slices/UserSlice";

import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface MyFormValues {
  password: string;
  password_confirmation: string;
}

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

function ChangePassword() {
  const { loginLoading } = useAppSelector(Loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const initialValues: MyFormValues = {
    password: "",
    password_confirmation: "",
  };

  const [isPassVisible, setPassVisible] = useState(false);

  const switchVisibility = () => {
    setPassVisible(!isPassVisible);
  };

  const submitForm = async (values: MyFormValues) => {
    const email: string = localStorage.getItem("userEmail") || "";
    const resetData = {
      email,
      ...values,
    };
    const { payload } = await dispatch(setNewPassword(resetData));
    if (payload.success) {
      toast.success(payload.success.message);
      navigate("/auth/login");
    }
    // actions.setSubmitting(false);
  };

  const signupSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .min(8, "Password should be of minimum 8 characters length")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(
        /[!@#$%^&*()\-_=+{};:,<.>]/,
        getCharacterValidationError("special caracters")
      )
      .required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Password Fields must match")
      .required("Required"),
  });

  return (
    <div className="w-100 d-flex justify-content-center">
      <Formik
        initialValues={initialValues}
        onSubmit={(values: MyFormValues) => submitForm(values)}
        validationSchema={signupSchema}
      >
        {({ errors, touched }) => (
          <Form
            className={`px-3 justify-content-start my-auto mx-auto px-lg-5 bg-white mx-lg-5 border d-flex flex-column gap-2 p-5 rounded-4 w-lg-50 w-75 flex-start ${classes.verfiyForm}`}
          >
            <div
              className={`d-flex flex-column align-items-center ${classes.formTitle}`}
            >
              <img srcSet="./images/loginlock.png" alt="" />
              <h2>Change password</h2>
              <p className="text-center">Enter your new password.</p>
            </div>
            <label className="d-flex" htmlFor="email">
              New password
            </label>
            <div className="position-relative mb-3 ">
              <div className={classes.passwordContainer}>
                <Field
                  id="password"
                  name="password"
                  type={isPassVisible ? "text" : "password"}
                  className={`rounded-3 p-2 form-control shadow-none ${
                    touched.password && errors.password && "is-invalid"
                  }`}
                  placeholder="New password"
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
            </div>

            <label className="d-flex" htmlFor="confirmPassword">
              Confirm new password
            </label>
            <div className="position-relative mb-3">
              <Field
                id="confirmPassword"
                name="password_confirmation"
                type="password"
                className={`rounded-3 p-2 form-control shadow-none ${
                  touched.password_confirmation &&
                  errors.password_confirmation &&
                  "is-invalid"
                }`}
                placeholder="Confirm new password"
              />
              {errors.password_confirmation && touched.password_confirmation ? (
                <div className={classes.error}>
                  {errors.password_confirmation}
                </div>
              ) : null}
            </div>

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
                  Reset
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <Toaster></Toaster>
    </div>
  );
}

export default ChangePassword;
