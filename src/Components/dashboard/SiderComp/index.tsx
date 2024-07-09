import { Layout, Menu, Avatar, Button } from "antd";
import { SideMenu } from "../../../Services/SideMenu";
import { Stack } from "react-bootstrap";
import { useAppSelector } from "../../../Hooks/ReduxHook";
import { User } from "../../../Redux/Slices/UserSlice";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import style from "./main.module.css";
import { useState } from "react";
const { Sider } = Layout;

const SiderComponent = () => {
  const { userData } = useAppSelector(User);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [collapsedWidth1, setCollapsedWidth1] = useState<string>("0");
  console.log(userData);

  // set
  return (
    <div className={style.sideBarContainer}>
      <Sider
        trigger={null}
        // theme="dark"
        style={{ backgroundColor: "#4C5260" }}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
            setCollapsedWidth1("0");
          } else {
            setCollapsed(false);
            setCollapsedWidth1("100px");
          }
        }}
        collapsedWidth={collapsedWidth1}
        collapsible
        collapsed={collapsed}
        className={style.asideStyle}
      >
        <Stack
          className="align-items-center justify-content-center my-4"
          style={{ color: "#fff" }}
        >
          <Avatar
            size={collapsed ? 50 : 100}
            icon={
              userData?.photo ? (
                <img src={`${userData?.photo}`} />
              ) : (
                <UserOutlined />
              )
            }
            className="mb-2"
          />
          <h6>{userData?.first_name || "Name"}</h6>
          {}
          <h6>
            {userData?.role === "student"
              ? `Grade ${userData?.grade}-${userData?.class}`
              : userData?.role}
          </h6>
        </Stack>
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "inherit", color: "white" }}
          defaultSelectedKeys={["1"]}
          items={
            userData?.role === "teacher"
              ? SideMenu["teacher"]
              : SideMenu["student"]
          }
          className={style.sideMenu}
        />
      </Sider>
      {location.pathname.split("/")[2] !== "userProfile" && (
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined size={4} />
            ) : (
              <MenuFoldOutlined size={4} />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          className={collapsed ? `${style.close}` : `${style.open}`}
        />
      )}
    </div>
  );
};

export default SiderComponent;
