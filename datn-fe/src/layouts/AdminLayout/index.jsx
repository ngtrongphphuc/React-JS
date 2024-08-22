import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { ROUTE_PATH } from "../../routes/route-path";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const MENUS = [
  {
    label: "Dashboard",
    icon: () => <AppstoreOutlined className="text-lg" />,
    path: ROUTE_PATH.DASHBOARD,
  },
  {
    label: "Quản lý danh mục",
    icon: () => <AppstoreOutlined className="text-lg" />,
    path: ROUTE_PATH.CATEGORY_MANAGEMENT,
  },
  {
    label: "Quản lý sản phẩm",
    icon: () => <AppstoreOutlined className="text-lg" />,
    path: ROUTE_PATH.PRODUCT_MANAGEMENT,
  },
];

const AdminLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={280}>
        <Link to={ROUTE_PATH.HOME}>
          <img src="/logo/logo.png" alt="Logo" className="h-24 mx-auto block" />
        </Link>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={MENUS.map((it, index) => ({
            key: index,
            label: <Link to={it.path}>{it.label}</Link>,
            icon: it.icon(),
          }))}
        />
      </Sider>

      <Layout style={{ marginInlineStart: 280 }} className="min-h-screen">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px", overflow: "initial" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
