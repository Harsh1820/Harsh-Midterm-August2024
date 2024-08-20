import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { TextField, Button, CircularProgress, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css'; // Import the CSS file

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  // State for success message
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if user is already logged in
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/members');
  }

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values.username, values.password))
      .then(() => {
        setSuccessMessage('Login successful!'); // Set success message
        setSubmitting(false);
        setTimeout(() => navigate('/members'), 2000); // Redirect after 2 seconds
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container">
      <div className="form">
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="field">
                <Field
                  name="username"
                  as={TextField}
                  label="Username"
                  fullWidth
                  required
                  variant="outlined"
                />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="field">
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  variant="outlined"
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <Button type="submit" variant="contained" className="submitButton" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} className="spinner" /> : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Snackbar for success message */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        message={successMessage}
        onClose={() => setSuccessMessage('')}
        action={
          <Button color="inherit" onClick={() => setSuccessMessage('')}>Close</Button>
        }
      />
    </div>
  );
};

export default Login;
