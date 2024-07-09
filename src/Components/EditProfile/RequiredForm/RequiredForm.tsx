import { useFormik } from "formik";
import classes from "./UserProfile.module.css";
import * as Yup from "yup";
import { Col, Form, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { User, handleEditProfile } from "../../../Redux/Slices/UserSlice";
import { MyFormValues } from "../../../Services/Interfaces/userInterFace";
import { message } from "antd";

export default function RequiredForm() {
  const { userData } = useAppSelector(User);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  const EditProfileSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .max(10, "Name is too long"),
    last_name: Yup.string()
      .required("Last Name is required")
      .max(10, "Name is too long"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone number is invalid ")
      .max(11, "Phone must be 11  digits"),
  });
  function handleSubmit(values: MyFormValues) {

    dispatch(handleEditProfile(values)).then(({ meta, payload }) =>
      meta.requestStatus === "fulfilled"
        ? messageApi.success(payload)
        : messageApi.error(payload)
    );
  }

  const initialValues: MyFormValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: EditProfileSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    formik.setValues(userData);
  }, [userData]);

  return (
    <div>
      {contextHolder}
      <Form
        className={`form ${classes.formSection} p-3 mb-4`}
        onSubmit={formik.handleSubmit}
      >
        <Row>
          <Col lg="4">
            <Form.Group className="mb-2" controlId="formPlaintextPassword1">
              <Form.Label>First Name</Form.Label>
              <Col sm="10" className="position-relative w-100">
                <Form.Control
                  type="text"
                  value={formik.values.first_name}
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.first_name && formik.touched.first_name ? (
                  <div className="position-absolute text-danger pb-2">
                    {formik.errors.first_name}
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </Form.Group>
          </Col>
          <Col lg="4">
            <Form.Group className="mb-2" controlId="formPlaintextPassword2">
              <Form.Label>Last Name</Form.Label>
              <Col sm="10" className="position-relative w-100">
                <Form.Control
                  type="text"
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
        <Row className="align-items-end my-2">
          <Col lg="4">
            <Form.Group className="mb-2" controlId="formPlaintextPassword3">
              <Form.Label>Email</Form.Label>
              <Col sm="10" className="position-relative w-100">
                <Form.Control
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  disabled
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
            <Form.Group className="mb-2" controlId="formPlaintextPassword4">
              <Form.Label>Phone Number</Form.Label>
              <Col sm="10" className="position-relative w-100">
                <Form.Control
                  type="tel"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone_number"
                />
                {formik.errors.phone_number && formik.touched.phone_number ? (
                  <div className="position-absolute text-danger">
                    {formik.errors.phone_number}
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </Form.Group>
          </Col>
          <Col md={4} className="">
            <div className={`${classes.submitBtn} mb-2 p-0`}>
              <button
                className="btn  "
                type="submit"
                disabled={!formik.isValid}
              >
                Save Changes
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
