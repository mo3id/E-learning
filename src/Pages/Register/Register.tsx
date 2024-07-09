import styles from "./Register.module.css";
import { Col, Form, Row, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyFormValues } from "../../Services/Interfaces/userInterFace";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { userMode } from "../../Redux/Slices/StateSlice";
import { Alert, Space } from "antd";
import {
  Loading,
  signUp,
  Errors,
  clearErrors,
} from "../../Redux/Slices/UserSlice";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SocialMediaButtons from "../../Components/SocialMedia/SocialMediaButtons/SocialMediaButtons";

export default function Register() {
  const [isPassVisible, setPassVisible] = useState(false);
  const roleFromLocalStorage: string | null = localStorage.getItem("role");
  let role: string | null;
  const switchVisibility = () => {
    setPassVisible(!isPassVisible);
  };
  const { registerError } = useAppSelector(Errors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);
  role = useAppSelector(userMode);
  if (!role) {
    role = roleFromLocalStorage;
  }
  const { loadingRegister } = useAppSelector(Loading);
  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };
  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("Name is required")
      .max(10, "Name is too long"),
    last_name: Yup.string()
      .required("Name is required")
      .max(10, "Name is too long"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone number is invalid ")
      .max(11, "Phone must be 11  digits"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is equired")
      .max(255, "Email is too long"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .min(8, "Minimum length is 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(
        /[!@#$%^&*()\-_=+{};:,<.>]/,
        getCharacterValidationError("special caracters")
      )
      .required("Required"),
    password_confirmation: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Password Fields must match"),
    checkPolicy: Yup.boolean().oneOf([true], "This box must be checked"),
  });
  async function handleSubmit(values: MyFormValues) {
    delete values.checkPolicy;
    const { payload } = await dispatch(signUp(values));
    if (payload?.success == true) {
      navigate("/verify");
    }
  }
  const initialValues: MyFormValues = {
    first_name: "",
    role,
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
    checkPolicy: false,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignupSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className={`${styles.bgRegister} ${role}`}>
        <Container className={styles.marTop}>
          <h2 className={`mb-4 ${styles.title}`}>Sign Up as a {role}</h2>
          <Form
            className={`${styles.widthForm} `}
            onSubmit={formik.handleSubmit}
          >
            <Row>
              <Col lg="4">
                <Form.Group className="mb-5" controlId="formPlaintextPassword1">
                  <Col
                    sm="10"
                    lg="12"
                    className={`position-relative ${styles.fixCenterSm}`}
                  >
                    <Form.Label className={styles.LabrlSetting}>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={`styles.inputSetting  ${
                        formik.touched.first_name &&
                        formik.errors.first_name &&
                        "is-invalid"
                      }`}
                      value={formik.values.first_name}
                      name="first_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.first_name && formik.touched.first_name ? (
                      <div className="position-absolute text-danger py-2">
                        {formik.errors.first_name}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col lg="4">
                <Form.Group className="mb-5" controlId="formPlaintextPassword2">
                  <Col
                    sm="10"
                    lg="12"
                    className={`position-relative ${styles.fixCenterSm}`}
                  >
                    <Form.Label className={styles.LabrlSetting}>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className={`styles.inputSetting  ${
                        formik.touched.last_name &&
                        formik.errors.last_name &&
                        "is-invalid"
                      }`}
                      value={formik.values.last_name}
                      name="last_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.last_name && formik.touched.last_name ? (
                      <div className="position-absolute text-danger">
                        {formik.errors.last_name}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <Form.Group className="mb-5" controlId="formPlaintextPassword3">
                  <Col
                    sm="10"
                    lg="12"
                    className={`position-relative ${styles.fixCenterSm}`}
                  >
                    <Form.Label className={styles.LabrlSetting}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      className={`styles.inputSetting  ${
                        formik.touched.email &&
                        formik.errors.email &&
                        "is-invalid"
                      }`}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email"
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <div className="position-absolute text-danger">
                        {formik.errors.email}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col lg="4">
                <Form.Group className="mb-5" controlId="formPlaintextPassword4">
                  <Col
                    sm="10"
                    lg="12"
                    className={`${styles.passwordContainerRegester} ${styles.fixCenterSm}`}
                  >
                    <Form.Label className={styles.LabrlSetting}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type={isPassVisible ? "text" : "password"}
                      className={`styles.inputSetting  ${
                        formik.touched.password &&
                        formik.errors.password &&
                        "is-invalid"
                      }`}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password"
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <div className="position-absolute text-danger">
                        {formik.errors.password}
                      </div>
                    ) : (
                      ""
                    )}

                    {!isPassVisible && (
                      <i
                        style={{
                          right: formik.errors.password ? "2rem" : "1rem",
                        }}
                        onClick={switchVisibility}
                        className="fa-regular fa-eye-slash"
                      ></i>
                    )}
                    {isPassVisible && (
                      <i
                        style={{
                          right: formik.errors.password ? "2rem" : "1rem",
                        }}
                        onClick={switchVisibility}
                        className="fa-regular fa-eye"
                      ></i>
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <Form.Group className="mb-5" controlId="formPlaintextPassword5">
                  <Col
                    sm="10"
                    lg="12"
                    className={`position-relative ${styles.fixCenterSm}`}
                  >
                    <Form.Label className={styles.LabrlSetting}>
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      className={`styles.inputSetting  ${
                        formik.touched.phone_number &&
                        formik.errors.phone_number &&
                        "is-invalid"
                      }`}
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="phone_number"
                    />
                    {formik.errors.phone_number &&
                    formik.touched.phone_number ? (
                      <div className="position-absolute text-danger">
                        {formik.errors.phone_number}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form.Group>
              </Col>
              <Col lg="4">
                <Form.Group className="mb-5" controlId="formPlaintextPassword6">
                  <Col
                    sm="10"
                    lg="12"
                    className={`position-relative ${styles.fixCenterSm}`}
                  >
                    <Form.Label className={styles.LabrlSetting}>
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      className={`styles.inputSetting  ${
                        formik.touched.password_confirmation &&
                        formik.errors.password_confirmation &&
                        "is-invalid"
                      }`}
                      value={formik.values.password_confirmation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password_confirmation"
                    />
                    {formik.errors.password_confirmation &&
                    formik.touched.password_confirmation ? (
                      <div className="position-absolute text-danger">
                        {formik.errors.password_confirmation}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="formPlaintextPassword7">
                  <Col
                    sm="10"
                    lg="12"
                    className={`position-relative ${styles.fixCenterSm}`}
                  >
                    <Form.Check
                      id={`checkBOX`}
                      label={`Agree the terms and conditions`}
                      name="checkPolicy"
                      type="checkbox"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.errors.checkPolicy && formik.touched.checkPolicy ? (
                      <div className="position-absolute text-danger">
                        {formik.errors.checkPolicy}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {registerError && (
              <Row>
                <Col lg="8" sm="10">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Alert message={registerError} type="error" />
                  </Space>
                </Col>
              </Row>
            )}
            <Row className={`mt-3 ${styles.Justifty}`}>
              <Col sm={2}></Col>
              <Col sm={4}>
                {/* <button
                  type="submit"
                  className={` w-100 ${styles.btnSubmit} ${`${role}Btn`}`}
                >
                  {loadingRegister ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Sign UP"
                  )}
                </button> */}
                {loadingRegister ? (
                  <button
                    type="button"
                    className={` w-100 ${styles.btnSubmit} ${`${role}Btn`}`}
                  >
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={` w-100 ${styles.btnSubmit} ${`${role}Btn`}`}
                  >
                    Sign Up
                  </button>
                )}
                <SocialMediaButtons formType={"register"} />
                <div className="d-flex justify-content-center mt-2">
                  Back to &nbsp;
                  <a href="#/" className={styles.homeLink}>
                    Home
                  </a>
                </div>
              </Col>
              <Col sm={2}></Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Toaster />
    </>
  );
}
