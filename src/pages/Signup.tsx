import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Input, message } from 'antd';
import { registerUser } from '../services/authService';
import '../styles/Auth.css'; // Import CSS file

const { Title } = Typography;

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too short').required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      await registerUser(values);
      message.success('Registration successful! Please log in.');
      navigate('/');
    } catch (error) {
      message.error('Registration failed! Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <Title level={2} className="auth-title">Sign Up</Title>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-group">
                <label>Name</label>
                <Field as={Input} name="name" placeholder="Enter your name" />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
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
                  Sign Up
                </Button>
              </div>
              <div className="auth-footer">
                <a onClick={() => navigate('/')}>Already have an account? Log In</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
