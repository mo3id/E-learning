import TeacherCourses from "../../Components/dashboard/Courses/TeacherCourses";
import StudentCourses from "../../Components/dashboard/StudentDashboard/StudentCourses/StudentCourses";
import { useAppSelector } from "../../Hooks/ReduxHook";
import { User } from "../../Redux/Slices/UserSlice";

export default function Courses() {
  const { userData } = useAppSelector(User);
  return (
    <>{userData.role === "teacher" ? <TeacherCourses /> : <StudentCourses />}</>
  );
}
