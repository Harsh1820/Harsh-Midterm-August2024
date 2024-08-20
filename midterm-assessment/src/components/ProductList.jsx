import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

const validationSchema = Yup.object({
  code: Yup.string().required('Code is required'),
  name: Yup.string().min(3).max(30).required('Name is required'),
  excerpt: Yup.string().required('Excerpt is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().min(0).required('Price is required')
});

const AddProducts = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('http://localhost:3000/api/v1/products', values);
    } catch (error) {
      console.error("Error adding product", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ code: '', name: '', excerpt: '', category: '', price: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="code" as={TextField} label="Code" fullWidth margin="normal" variant="outlined" />
            <ErrorMessage name="code" component="div" className="error" />
            <Field name="name" as={TextField} label="Name" fullWidth margin="normal" variant="outlined" />
            <ErrorMessage name="name" component="div" className="error" />
            <Field name="excerpt" as={TextField} label="Excerpt" fullWidth margin="normal" variant="outlined" />
            <ErrorMessage name="excerpt" component="div" className="error" />
            <Field name="category" as={TextField} label="Category" fullWidth margin="normal" variant="outlined" />
            <ErrorMessage name="category" component="div" className="error" />
            <Field name="price" as={TextField} type="number" label="Price" fullWidth margin="normal" variant="outlined" />
            <ErrorMessage name="price" component="div" className="error" />
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Add Product'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddProducts;
