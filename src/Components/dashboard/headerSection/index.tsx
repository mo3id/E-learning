import { theme, Avatar, Dropdown, Input } from "antd";
import { useState } from "react";
import { Container, Navbar, Stack } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  // MenuFoldOutlined,
  // MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faComments } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../Hooks/ReduxHook";
import { User, handleLogout } from "../../../Redux/Slices/UserSlice";
import classes from "./headerSection.module.css";

// type Props = {
//   collapsed: boolean;
//   setCollapsed: React.Dispatch<SetStateAction<boolean>>;
// };

const HeaderSection = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(User);
  const [searchCollapse, setSearchCollapse] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function Logout() {
    await dispatch(handleLogout(localStorage.getItem("token") || ""));
    navigate("/auth/login", {
      replace: true,
    });
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <SettingOutlined />,
      label:
        location.pathname.split("/")[2] !== "userProfile" ? (
          <Link to={"./userProfile"}>Profile</Link>
        ) : (
          <Link to={"/dashboard"}>Dashboard</Link>
        ),
    },
    {
      key: "2",
      danger: true,
      onClick: Logout,
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];
  return (
    <header className="p-0" style={{ background: colorBgContainer }}>
      <Navbar expand="lg" className="bg-body-tertiary justify-content-between">
        <Container>
          {/* {location.pathname.split("/")[2] !== "userProfile" && (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          )} */}
          <Link to="/">
            <img src="./images/sphinx-logo.png" alt="logo" />
          </Link>
          {location.pathname.split("/")[2] === "userProfile" ? (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Avatar
                className={userData.photo ? "" : classes.avatarIcon}
                style={{ cursor: "pointer" }}
                icon={
                  userData.photo ? (
                    <img
                      src={`${userData.photo}`}
                      alt={userData.first_name?.slice(0, 1)}
                    />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
            </Dropdown>
          ) : (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Stack className="gap-3  flex-grow-1 justify-content-md-end justify-content-center align-items-center flex-row">
                  <Input
                    bordered={false}
                    placeholder="large size"
                    onFocus={() => setSearchCollapse(true)}
                    onBlur={() => setSearchCollapse(false)}
                    style={
                      searchCollapse
                        ? { background: "#ddd", width: "250px" }
                        : { width: "0px" }
                    }
                    prefix={<SearchOutlined />}
                  />
                  <Link to={"#home"}>
                    {/* <NotificationOutlined /> */}
                    <FontAwesomeIcon icon={faBell} />
                  </Link>
                  <Link to={"#home"}>
                    <FontAwesomeIcon icon={faComments} />
                  </Link>
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <Avatar
                      className={userData.photo ? "" : classes.avatarIcon}
                      style={{ cursor: "pointer" }}
                      icon={
                        userData.photo ? (
                          <img
                            src={`${userData.photo}`}
                            alt={userData.first_name?.slice(0, 1)}
                          />
                        ) : (
                          <UserOutlined />
                        )
                      }
                    />
                  </Dropdown>
                </Stack>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
      <Container className="d-flex align-items-center gap-2"></Container>
    </header>
  );
};

export default HeaderSection;
