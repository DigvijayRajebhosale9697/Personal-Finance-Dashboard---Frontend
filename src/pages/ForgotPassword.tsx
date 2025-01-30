import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Input, message } from 'antd';
import '../styles/Auth.css'; 

const { Title } = Typography;

const ForgotPassword = () => {
  const navigate = useNavigate(); 

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSubmit = async () => {
    try {
      // await sendPasswordResetLink(values); 
      message.success('Password reset link sent to your email!');
      navigate('/login');
    } catch (error) {
      message.error('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <Title level={2} className="auth-title">Forgot Password</Title>
        <Formik
          initialValues={{ email: '' }}
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
              <div>
                <Button type="primary" htmlType="submit" block disabled={isSubmitting}>
                  Send Reset Link
                </Button>
              </div>
              <div className="auth-footer">
                <a onClick={() => navigate('/')}>Back to Login</a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
