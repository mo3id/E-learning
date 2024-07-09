import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/ReduxHook";
import { User, handleLogout } from "../../Redux/Slices/UserSlice";
import { Avatar, Dropdown, MenuProps } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

function NavScrollExample() {
  const [navStyle, setNavStyle] = useState(false);
  const { userData, isLogged } = useAppSelector(User);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const changeNavBarStyle = () => {
    if (window.scrollY >= 400) {
      setNavStyle(true);
    } else {
      setNavStyle(false);
    }
  };
  useEffect(() => {
    changeNavBarStyle();
    window.addEventListener("scroll", changeNavBarStyle);
  });

  const logout = async () => {
    const { payload } = await dispatch(
      handleLogout(localStorage.getItem("token") || "")
    );
    payload.success && navigate("/auth/login");
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <SettingOutlined />,
      label: <Link to={"/dashboard"}>Dashboard</Link>,
    },
    {
      key: "2",
      danger: true,
      icon: <LogoutOutlined />,
      label: <div onClick={logout}>Logout</div>,
    },
  ];
  return (
    <Navbar
      expand="lg"
      className={
        navStyle
          ? `bg-body-tertiary-white fixed-top show`
          : `bg-body-tertiary  fixed-top   bg-body-tertiary-white  `
      }
    >
      <Container fluid>
        <Navbar.Brand className="ms-4">
          <Link to="/">
            <img src="./images/sphinx-logo.png" alt="logo" title="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          className="justify-content-end me-4 gap-5"
          id="navbarScroll"
        >
          <Nav className=" my-2 my-lg-0 me-2 fs-3 fw-bold gap-4">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Courses</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
          </Nav>
          {isLogged ? (
            <>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div className="d-flex align-items-center gap-2">
                  <span className="homePage--profileName ">{`${userData.first_name} ${userData.last_name}`}</span>
                  <Avatar
                    className={userData.photo ? "" : "homePage--profileIcon"}
                    style={{ cursor: "pointer" }}
                    icon={
                      userData.photo ? (
                        <img src={`${userData.photo}`} />
                      ) : (
                        <UserOutlined />
                      )
                    }
                  />
                </div>
              </Dropdown>
            </>
          ) : (
            <Link to="/auth/login">
              <Button className="navbarBtn" variant="outline-success">
                Login
              </Button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
