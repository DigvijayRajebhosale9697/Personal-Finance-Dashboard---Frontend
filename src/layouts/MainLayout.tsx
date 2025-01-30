import React from "react";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";  // Import the Navbar
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar /> {/* Sidebar stays on the left */}
      <Layout>
        <Navbar /> {/* Add Navbar here, above Content */}
        <Content style={{ padding: "20px" }}>
          <Outlet /> {/* This will render the respective page */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
