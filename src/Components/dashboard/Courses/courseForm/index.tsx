// import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
// import type { SelectProps } from "antd";
import { CourseInterFace } from "../../../../Services/Interfaces/course";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Container, Row } from "react-bootstrap";
import CourseImage from "./courseImg";
import { useAppDispatch } from "../../../../Hooks/ReduxHook";
import {
  handleCreateCourse,
  handleEditCourse,
} from "../../../../Redux/Slices/CourseSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    lg: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 5 },
    lg: { span: 24, offset: 4 },
  },
};
const subjects = [
  {
    value: "math",
    label: "Math",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "other",
    label: "Other",
  },
];

// const options: SelectProps["options"] = [];
const options = [
  { value: "A" },
  { value: "B" },
  { value: "C" },
  { value: "D" },
  { value: "E" },
];

export default function CourseForm({ course }: { course?: CourseInterFace }) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [courseImg, setCourseImg] = useState<Blob | string>(
    course?.photo || ""
  );

  const onFinish = (values: CourseInterFace) => {
    course
      ? dispatch(
          handleEditCourse(
            courseImg && typeof courseImg !== "string"
              ? {
                  ...values,
                  photo: courseImg,
                  id: id,
                  active: values.active ? 1 : 0,
                }
              : { ...values, id: id, active: values.active ? 1 : 0 }
          )
        ).then(
          ({ type }) =>
            type.split("/")[2] === "fulfilled" && navigate("/dashboard/courses")
        )
      : dispatch(
          handleCreateCourse(
            courseImg ? { ...values, photo: courseImg } : { ...values }
          )
        ).then(
          ({ type }) =>
            type.split("/")[2] === "fulfilled" && navigate("/dashboard/courses")
        );
  };

  return (
    <Form
      className="py-3 p-1"
      labelCol={{ lg: { span: 4 }, md: { span: 4 }, sm: { span: 24 } }}
      wrapperCol={{ md: { span: 19 }, sm: { span: 24 } }}
      size={"large"}
      style={{ backgroundColor: "#f5f5f5" }}
      initialValues={course}
      onFinish={onFinish}
    >
      <Container className="d-flex flex-column">
        <Row className="justify-content-center">
          <Col className="order-2 order-lg-1">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input course name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Grade"
              name="grade"
              rules={[
                {
                  required: true,
                  message: "Please input course Grade!",
                },
              ]}
            >
              <InputNumber max={12} min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Class"
              name="class"
              rules={[
                {
                  required: true,
                  message: "Please input course class!",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                // onChange={handleChange}
                options={options}
              />
            </Form.Item>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[
                { required: true, message: "Please input course Subject!" },
              ]}
            >
              <Select options={subjects} />
            </Form.Item>
            {/* <Form.Item
              label="Hours"
              name="hours"
              rules={[
                {
                  required: true,
                  message: "Please input course Hours!",
                },
              ]}
            >
              <Input />
            </Form.Item> */}
          </Col>
          <Col className="order-1 order-lg-2 " lg={4}>
            <CourseImage
              courseImg={courseImg || ""}
              setCourseImg={setCourseImg}
            />
          </Col>
        </Row>

        <Divider />
        {course && (
          <Form.Item
            label="Active"
            name="active"
            initialValue={course.active === 1 ? true : false}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        )}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input course description!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Col>
          <Form.List
            name="target"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error("At least 2 Objectives"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <Row>
                {fields.map((field, index) => (
                  <Col xs={12} key={field.key}>
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? "Objectives" : ""}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input Objective's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder={`Objective ${index + 1}`}
                          style={{ width: "80%", marginInlineEnd: "1rem" }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  </Col>
                ))}
                <Form.Item wrapperCol={{ span: 4, offset: 4 }}>
                  <Button
                    className="green_btn_outline"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Target
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </Row>
            )}
          </Form.List>
        </Col>
        <Button
          className="align-self-end green_btn"
          type="primary"
          htmlType="submit"
        >
          {course ? "Update" : "Create Course"}
        </Button>
      </Container>
    </Form>
  );
}
