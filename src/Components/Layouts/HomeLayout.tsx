import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
function HomeLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default HomeLayout;
