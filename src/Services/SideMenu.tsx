import {
  BookOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const SideMenu = {
  student: [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to={"/dashboard"}>Home</Link>,
    },
    {
      key: "2",
      icon: <BookOutlined />,
      label: <Link to={"/dashboard/courses"}>My Courses</Link>,
    },
    {
      key: "3",
      icon: <QuestionCircleOutlined />,
      label: <Link to={"/dashboard/assignments"}>Assignments</Link>,
    },
  ],
  teacher: [
    {
      key: "1",
      icon: <BookOutlined />,
      label: "Courses",
      theme: "light",
      children: [
        {
          key: "1-1",
          label: <Link to={"/dashboard/courses"}>All Courses</Link>,
        },
        {
          key: "1-2",
          label: <Link to={"/dashboard/courses/add"}>Create Course</Link>,
        },
      ],
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to={"/dashboard/courses/allStudent"}>Student</Link>,
    },
  ],
};
