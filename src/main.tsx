import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Root from "./Pages/Root.tsx";
import Counter from "./Components/Counter.tsx";
import Home from "./Pages/Home/Home.tsx";
import NotFound from "./Pages/NotFound/index.tsx";
import Login from "./Pages/Login/index.tsx";
import Register from "./Pages/Register/Register.tsx";
import HomeLayout from "./Components/Layouts/HomeLayout.tsx";
import DashboardLayout from "./Components/Layouts/DashboardLayout/index.tsx";
import UserProfile from "./Pages/UserProfile/index.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Store.tsx";
import VerfiyRegester from "./Pages/VerfiyRegister/VerfiyRegester.tsx";
import {
  courserLoader,
  getRole,
  indexLoader,
  loginLoader,
  presistLoader,
  verifyEmail,
} from "./utiles/loaders.ts";
import ResetPassword from "./Pages/ResetPassword/ResetPassword.tsx";
import VerifyEmail from "./Pages/ResetPassword/VerifyEmail.tsx";
// import { loginLoader } from "./utiles/loaders.ts";
import Success from "./Components/SocialMedia/SocialMediaAction/Success.tsx";
import Failed from "./Components/SocialMedia/SocialMediaAction/Failed.tsx";
import Progress from "./Components/Progress/Progress.tsx";
import CreateCourse from "./Pages/Course/CreateCourse/index.tsx";
// import Courses from "./Components/dashboard/Courses/TeacherCourses.tsx";
import UpdateCourse from "./Pages/Course/updateCourse/index.tsx";
import CourseDetails from "./Pages/CourseDetails/CourseDetails.tsx";

import ModulesCreation from "./Components/ModulesCreation/ModulesCreation.tsx";
import StudentAdding from "./Pages/StudentAdding/studentAdding.tsx";
import AllStudent from "./Pages/AllStudent/AllStudent.tsx";
import CourseStudy from "./Pages/Course/courseStudy/index.tsx";
// import StudentCourses from "./Components/dashboard/StudentDashboard/StudentCourses/StudentCourses.tsx";
import Courses from "./Pages/Course/index.tsx";
import Charts from "./Components/Charts/index.tsx";
import Assignments from "./Pages/Assignment/Assignment.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Progress>
        <Root />
      </Progress>
    ),
    errorElement: <NotFound />,
    loader: indexLoader,
    children: [
      // Elements that need Nav and Footer
      {
        element: <HomeLayout />,
        children: [
          { index: true, element: <Home /> },
          // {
          //   path: "counter",
          //   element: <Counter />,
          // },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: presistLoader,
        children: [
          { index: true, element: <Charts /> },
          { path: "userProfile", element: <UserProfile /> },
          {
            path: "assignments",
            element: <Assignments />,
          },
          {
            path: "courses",
            children: [
              {
                index: true,
                element: <Courses />,
              },
              {
                path: "addStudent/:id",
                element: <StudentAdding></StudentAdding>,
              },
              { path: "add", element: <CreateCourse /> },
              { path: ":id", element: <CourseDetails /> },
              { path: ":id/edit", element: <UpdateCourse /> },
              { path: ":id/courseStudy", element: <CourseStudy /> },
              { path: "add-module/:courseId", element: <ModulesCreation /> },
              {
                path: "add-assignment/:courseId",
                element: <ModulesCreation />,
              },

              // { path: "detailsCourse/:id", element: <CourseDetails /> },
              {
                path: "allStudent",
                element: <AllStudent />,
                loader: courserLoader,
              },
            ],
          },
          // {
          //   path: "student/courses",
          //   element: <StudentCourses />,
          // },
        ],
      },
      { path: "register", element: <Register />, loader: getRole },
      { path: "verify", element: <VerfiyRegester />, loader: verifyEmail },
      {
        path: "auth",
        element: "",
        children: [
          { path: "login", element: <Login />, loader: loginLoader },
          {
            path: "verify-email",
            element: <VerifyEmail />,
            loader: verifyEmail,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
            loader: verifyEmail,
          },
        ],
      },
    ],
  },
  {
    path: "socialLogin",
    element: "",
    children: [
      {
        path: "success/",
        element: <Success />,
      },
      {
        path: "failed/",
        element: <Failed />,
      },
    ],
  },
  {
    path: "counter",
    element: <Counter />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
