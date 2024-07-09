import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { User } from "../../../Redux/Slices/UserSlice";
import CourseForm from "../../../Components/dashboard/Courses/courseForm";
import { useEffect, useState } from "react";
import { courseData, getCourse } from "../../../Redux/Slices/CourseSlice";
import { Navigate, useParams } from "react-router-dom";
import { Spin } from "antd";

export default function UpdateCourse() {
  const { isLogged, userData } = useAppSelector(User);
  const [loading, setLoading] = useState(true);
  const course = useAppSelector(courseData);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourse(id!)).then(() => setLoading(false));
  }, []);
  if (userData.role === "teacher") {
    return (
      <>
        {isLogged && (
          <Container className="d-flex flex-column justify-content-center">
            <h4 className="mb-3">Update Course</h4>
            {loading ? (
              <Spin
                size="large"
                className="align-self-center flex-grow-1 d-flex align-items-center p-5 m-5"
              />
            ) : (
              <CourseForm course={course} />
            )}
          </Container>
        )}
      </>
    );
  } else {
    return <Navigate to="/dashboard" replace={true} />;
  }
}
