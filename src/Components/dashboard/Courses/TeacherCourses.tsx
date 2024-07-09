import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import classes from "./Courses.module.css";
import { Avatar, Dropdown, Skeleton, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  PlusOutlined,
  StopOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  allCoursesData,
  fetchCourses,
} from "../../../Redux/Slices/CourseSlice";
import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { Link, useNavigate } from "react-router-dom";
import { CourseInterFace } from "../../../Services/Interfaces/course";
import ModelDeactive from "../../ModelDeactive/ModelDeactive";

const TeacherCourses = () => {
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState<CourseInterFace>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const allCourses = useAppSelector(allCoursesData);

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <PlusOutlined />,
      label: <Link to={`./add-module/${current.id}`}>Add Lesson</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      icon: <PlusOutlined />,
      label: <Link to={`./manage-assignment/${current.id}`}>Add Assignment</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      icon: <FontAwesomeIcon icon={faPen} />,
      label: <Link to={`./${current.id}/edit`}>Edit Course</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      icon: <StopOutlined />,
      onClick: () => ModelDeactive(current.id),
      label: "Deactive",
      disabled: current.active == 0,
    },
    {
      type: "divider",
    },
    {
      key: "5",
      danger: true,
      icon: <FontAwesomeIcon icon={faTrash} />,
      label: <div>Move to trash</div>,
    },
  ];

  useEffect(() => {
    dispatch(fetchCourses()).then(() => setLoading(false));
  }, [current]);

  return (
    <Container>
      <Row xs={1} md={3} lg={4} className="g-4">
        <Col>
          <Card
            className={`${classes.cardParent} h-100`}
            onClick={() => navigate("./add")}
          >
            <Card.Body className="h-100">
              <Card.Title className="d-flex flex-column justify-content-evenly align-items-center mb-0 h-100">
                <FontAwesomeIcon className={classes.addCourse} icon={faPlus} />
                <h5>New Course</h5>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        {loading
          ? Array(10)
              .fill(0)
              .map((_, i) => <Skeleton key={i} active />)
          : allCourses.map((course: CourseInterFace) => (
              <Col key={course.id}>
                {/* <Skeleton active> */}
                <Card
                  className={`${classes.cardParent} ${
                    course.active == 0 && classes.deactive
                  } h-100`}
                >
                  <Card.Img
                    className={`${classes.cardImage}`}
                    variant="top"
                    src={`${course.photo}`}
                  />

                  <Card.Body className={`d-flex flex-column gap-2`}>
                    <div className="d-flex align-items-center justify-content-between">
                      <Link
                        className={classes.courseNameLink}
                        to={`${course.id}`}
                      >
                        <Card.Title className={classes.courseName}>
                          {course.name}
                        </Card.Title>
                      </Link>
                      <div className={classes.list}>
                        <Dropdown
                          placement="topRight"
                          arrow={{ pointAtCenter: true }}
                          menu={{ items }}
                          trigger={["hover"]}
                          onOpenChange={() => setCurrent(course)}
                        >
                          {/* <MoreOutlined /> */}
                          <SettingOutlined />
                        </Dropdown>
                      </div>
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-start gap-2 ${classes.students}`}
                    >
                      <div className="text">Assign To:</div>
                      <Avatar.Group>
                        <Tooltip title="student name" placement="top">
                          <Avatar
                            style={{ backgroundColor: "#4C5260" }}
                            icon={<UserOutlined />}
                          />
                        </Tooltip>
                        <Tooltip title="student name" placement="top">
                          <Avatar
                            style={{ backgroundColor: "#4C5260" }}
                            icon={<UserOutlined />}
                          />
                        </Tooltip>
                        <Tooltip title="student name" placement="top">
                          <Avatar
                            style={{ backgroundColor: "#4C5260" }}
                            icon={<UserOutlined />}
                          />
                        </Tooltip>
                      <Link to={`./addStudent/${course.id}`}>
                      <Tooltip title="Add Student" placement="top">
                          <Avatar style={{ backgroundColor: "#4C5260" }} onClick={()=>console.log("gkkj")}>
                            +
                          </Avatar>
                        </Tooltip>
                      </Link>
                      </Avatar.Group>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default TeacherCourses;
