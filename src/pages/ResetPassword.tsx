import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, message } from 'antd';
import { resetPassword,validateResetToken } from '../services/authService'; // Assuming you have a function for resetting the password
import '../styles/Auth.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Retrieve token from URL
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    // Validate the token by calling an API endpoint
    const validateToken = async () => {
      try {
        // Assuming a service function to verify the token
        await validateResetToken(token);
        setIsValidToken(true);
      } catch (error) {
        message.error('Invalid or expired token.');
        navigate('/forgot-password'); // Redirect to forgot password page if invalid
      }
    };
    if (token) {
      validateToken();
    }
  }, [token, navigate]);

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values: { password: string }) => {
    try {
      await resetPassword({ token, password: values.password });
      message.success('Password has been reset successfully!');
      navigate('/login'); // Redirect to login page after successful password reset
    } catch (error) {
      message.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Reset Your Password</h2>
        {isValidToken ? (
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="input-group">
                  <label>New Password</label>
                  <Field as={Input.Password} name="password" placeholder="Enter new password" />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <div className="input-group">
                  <label>Confirm Password</label>
                  <Field as={Input.Password} name="confirmPassword" placeholder="Confirm new password" />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </div>
                <div>
                  <Button type="primary" htmlType="submit" block disabled={isSubmitting}>
                    Reset Password
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Validating token...</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
