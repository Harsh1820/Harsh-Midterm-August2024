import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { TextField, Button, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css';

const validationSchema = Yup.object({
  displayName: Yup.string().required('Display Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().required('Role is required')
});

const Register = () => {
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/roles');
        if (response.data.ok && Array.isArray(response.data.roles)) {
          setRoles(response.data.roles);
        } else {
          console.error('Unexpected API response :', response.data);
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="container">
      <div className="form">
        <Formik
          initialValues={{ displayName: '', email: '', username: '', password: '', role: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(register(values.displayName, values.email, values.username, values.password, values.role));
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="field">
                <Field
                  name="displayName"
                  as={TextField}
                  label="Display Name"
                  fullWidth
                  required
                  variant="outlined"
                />
                <ErrorMessage name="displayName" component="div" className="error" />
              </div>
              <div className="field">
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  variant="outlined"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
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
              <div className="field">
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Field
                    as={Select}
                    name="role"
                    label="Role"
                    onChange={(e) => setFieldValue('role', e.target.value)}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role._id} value={role._id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <ErrorMessage name="role" component="div" className="error" />
                </FormControl>
              </div>
              <Button type="submit" variant="contained" className="submitButton" disabled={isSubmitting || loading}>
                {loading || isSubmitting ? <CircularProgress size={24} className="spinner" /> : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
