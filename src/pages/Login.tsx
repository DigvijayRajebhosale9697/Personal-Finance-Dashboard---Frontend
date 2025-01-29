import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Input, message } from 'antd';
import { loginUser } from '../services/authService';
import '../styles/Auth.css'; 

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginUser(values);
      message.success('Login successful!');
      sessionStorage.setItem('authToken', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <Title level={2} className="auth-title">Log In</Title>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-group">
                <label>Email</label>
                <Field as={Input} name="email" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <Field as={Input.Password} name="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div>
                <Button type="primary" htmlType="submit" block disabled={isSubmitting}>
                  Log In
                </Button>
              </div>
              <div className="forgot-password-container">
                <div className="forgot-password">
                  <a onClick={() => navigate('/forgot-password')}>Forgot Password?</a>
                </div>
                <div className="signup-text">
                  <Typography.Text>
                    Don't have an account?{' '}
                    <Typography.Link onClick={() => navigate('/signup')}>
                      Sign Up
                    </Typography.Link>
                  </Typography.Text>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
