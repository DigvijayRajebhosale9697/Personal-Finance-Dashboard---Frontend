import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: "20px" }}>
          <Outlet /> {/* This will render the respective page */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
