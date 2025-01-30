import React from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import {
  DashboardOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <Sider theme="dark" collapsible>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Avatar size={64} src="https://marketplace.canva.com/EAGQZhT83lg/1/0/1600w/canva-dark-green-modern-illustrative-finance-service-logo-GTKa2Yxea4Y.jpg" />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DollarCircleOutlined />}>
          <Link to="/transactions">Transactions</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BarChartOutlined />}>
          <Link to="/category">Category</Link>
        </Menu.Item>

        {/* <Divider style={{ background: "gray", margin: "10px 0" }} /> */}

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
