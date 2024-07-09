import { Container } from "react-bootstrap";
import { useAppSelector } from "../../../Hooks/ReduxHook";
import { User } from "../../../Redux/Slices/UserSlice";
import CourseForm from "../../../Components/dashboard/Courses/courseForm";
import { Navigate } from "react-router-dom";

export default function CreateCourse() {
  const { isLogged, userData } = useAppSelector(User);
  if (userData.role === "teacher") {
    return (
      <>
        {isLogged && (
          <Container>
            <h4 className="mb-3">Create New Course</h4>
            <CourseForm />
          </Container>
        )}
      </>
    );
  } else {
    return <Navigate to="/dashboard" replace={true} />
  }
}
