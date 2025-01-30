import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;
const { Text } = Typography;

const Navbar: React.FC = () => {
  const { email } = useAuth();

  return (
    <Header style={{ padding: '0 20px', backgroundColor: '#001529' }}>
      <Row justify="space-between" align="middle">
        <Col>
          {/* <Text style={{ color: 'white', fontSize: '20px' }}>Welcome</Text> */}
        </Col>
        <Col>
          <Text style={{ color: 'white', fontSize: '16px' }}>
            {email ? `Hello, ${email}` : 'Please Log In'}
          </Text>
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
