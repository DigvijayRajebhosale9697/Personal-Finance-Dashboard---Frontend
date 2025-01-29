import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <Title level={2}>Welcome to the Dashboard!</Title>
    <p>Manage your finances here.</p>
  </div>
);

export default Dashboard;
