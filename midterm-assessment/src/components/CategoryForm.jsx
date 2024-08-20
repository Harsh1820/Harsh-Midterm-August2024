import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './CategoryForm.css'; // Import the CSS file

const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  description: Yup.string().required('Description is required')
});

const CategoryForm = ({ categoryId }) => {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/categories/${categoryId}`);
          setCategory(response.data);
        } catch (error) {
          console.error("Error fetching category", error);
        }
      };

      fetchCategory();
    }
  }, [categoryId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (categoryId) {
        await axios.put(`http://localhost:3000/api/v1/categories/${categoryId}`, values);
      } else {
        await axios.post('http://localhost:3000/api/v1/categories', values);
      }
      // Redirect to CategoryList after successful submission
      navigate('/categories');
    } catch (error) {
      console.error("Error saving category", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="container">
      <div className="form">
        <Formik
          initialValues={{
            name: category ? category.name : '',
            description: category ? category.description : ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="field">
                <Field name="name" as={TextField} label="Category Name" fullWidth margin="normal" variant="outlined" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="field">
                <Field name="description" as={TextField} label="Description" fullWidth margin="normal" variant="outlined" />
                <ErrorMessage name="description" component="div" className="error" />
              </div>
              <Button type="submit" variant="contained" color="primary" className="submitButton" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default CategoryForm;
