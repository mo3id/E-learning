import { Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import SiderComponent from "../../dashboard/SiderComp";
import HeaderSection from "../../dashboard/headerSection";
import "./style.scss";
import ModelResource from "../../ModelResource/ModelResource";

const { Content, Footer } = Layout;

export default function DashboardLayout() {
  const location = useLocation();

  // const onClose = () => {
  //   setCollapsed(false);
  // };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="dashboardLayoutCont">
      <Layout>
        {location.pathname.split("/")[2] !== "userProfile" && (
          <SiderComponent />
        )}
        <Layout>
          <HeaderSection />

          <Content
            className="contentCont"
            style={{
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
          <Footer className="p-1 text-center">
            Sphinx Publishing Co &copy;2023 created by Sphinx ERC
          </Footer>
          <ModelResource/>
        </Layout>
      </Layout>
    </Layout>
  );
}
