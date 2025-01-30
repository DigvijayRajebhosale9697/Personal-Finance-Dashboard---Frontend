import React, { useState } from "react";
import { Layout, Menu, Avatar } from "antd";
import {
  DashboardOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const handleLogout = () => {
    navigate("/");
  };

  // Map paths to menu item keys
  const getSelectedKey = () => {
    if (location.pathname.includes("/dashboard")) return "1";
    if (location.pathname.includes("/transactions")) return "2";
    if (location.pathname.includes("/category")) return "3";
    if (location.pathname.includes("/profile")) return "5";
    return "1"; // Default to dashboard
  };

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="md"
      collapsedWidth={80}
      defaultCollapsed={true}
    >
      <div className="logoContainer" style={{ textAlign: "center", padding: "10px 0" }}>
        <Avatar
          size={collapsed ? 40 : 44}
          src="https://marketplace.canva.com/EAGQZhT83lg/1/0/1600w/canva-dark-green-modern-illustrative-finance-service-logo-GTKa2Yxea4Y.jpg"
        />
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey()]}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DollarCircleOutlined />}>
          <Link to="/transactions">Transactions</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BarChartOutlined />}>
          <Link to="/category">Category</Link>
        </Menu.Item>

        <Menu.SubMenu key="4" icon={<SettingOutlined />} title="Settings">
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/profile">My Profile</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
