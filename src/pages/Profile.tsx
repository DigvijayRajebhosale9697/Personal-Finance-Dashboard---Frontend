import React from "react";
import { Card, Avatar, Typography } from "antd";

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const user = {
    name: "Digvijay Rajebhosale",
    email: "digvijay@example.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/219/219988.png",
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Card style={{ width: 400, textAlign: "center", padding: 20 }}>
        <Avatar size={80} src={user.avatar} />
        <Title level={3} style={{ marginTop: 10 }}>{user.name}</Title>
        <Text type="secondary">{user.email}</Text>
      </Card>
    </div>
  );
};

export default Profile;
