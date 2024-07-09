import { Card, Col, Container, Row } from "react-bootstrap";
import classes from "./StudentCourses.module.css";
import { Progress, Rate, Skeleton } from "antd";
import { CourseInterFace } from "../../../../Services/Interfaces/course";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Hooks/ReduxHook";
import {
  allCoursesData,
  fetchCourses,
} from "../../../../Redux/Slices/CourseSlice";
import { Link } from "react-router-dom";

const StudentCourses = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const allCourses = useAppSelector(allCoursesData);

  useEffect(() => {
    dispatch(fetchCourses()).then(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-4">
        {loading
          ? Array(10)
              .fill(0)
              .map(() => <Skeleton active />)
          : allCourses.map((course: CourseInterFace) => (
              <Col key={course.id}>
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
                    {/* <div className="d-flex align-items-center justify-content-between"> */}
                    {/* <div className={classes.courseNameLink}> */}

                    <Card.Title
                      className={`d-flex align-items-center justify-content-between ${classes.courseName}`}
                    >
                      {course.name}
                      <Rate
                        disabled
                        defaultValue={4}
                        style={{ fontSize: "1.1rem", color: "#EDE528" }}
                      />
                    </Card.Title>
                    <div className={classes.coursedesc}>
                      {course.description}
                    </div>
                    <div className={classes.courseauther}>
                      {`By ${course.teacher?.first_name} ${course.teacher?.last_name}`}
                    </div>
                    <div
                      className={`${classes.coursProgress} d-flex flex-column align-items-end`}
                    >
                      <span
                        style={{ color: "#419A9E" }}
                      >{`${course.pivot?.progress}% complete`}</span>
                      <Progress
                        percent={parseInt(course.pivot.progress)}
                        showInfo={false}
                        strokeColor={"#419A9E"}
                        style={{ margin: 0 }}
                      />
                    </div>
                    <Link
                      className={`${classes.startCourse} btn`}
                      type="primary"
                      // className="btn btn-primary gray_btn mt-2"
                      to={`${course.id}`}
                    >
                      Start
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default StudentCourses;
