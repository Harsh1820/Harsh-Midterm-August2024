import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Box,
    Typography,
    Container,
    Paper,
} from "@mui/material";

function AddProducts() {
    let [categories, setCategories] = useState([]);
    let [data, setData] = useState([{ code: "code", name: "name", excerpt: "Description", category: "Category", price: Number }]);

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("Code is a required field")
            .max(6, "Code cannot exceed 6 characters"),
        name: Yup.string()
            .required("Name is a required field")
            .max(50, "Name cannot exceed 50 characters"),
        excerpt: Yup.string()
            .required("Excerpt is a required field")
            .max(200, "Excerpt cannot exceed 200 characters"),
        category: Yup.string().required("Category is a required field"),
        price: Yup.number()
            .required("Price is a required field")
            .positive("Price must be positive"),
    });

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/categories")
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (values, { resetForm }) => {
        axios.post("http://localhost:3000/api/v1/products", values)
            .then(function (response) {
                console.log(response);
                setData([...data, values]);
                window.alert("Product successfully added!");
                resetForm();
            })
            .catch(function (err) {
                console.log(err);
                window.alert("Failed to add product.");
            })
    };

    const generateCode = () => {
        const uniqueCode = uuidv4().slice(0, 6).toUpperCase();
        return uniqueCode;
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Product
                </Typography>
                <Formik
                    initialValues={{ code: "", name: "", excerpt: "", category: "", price: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    name="code"
                                    label="Product Code"
                                    variant="outlined"
                                    placeholder="Enter Product Code"
                                    onChange={(e) => setFieldValue("code", e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setFieldValue("code", generateCode())}
                                    style={{ marginTop: 10 }}
                                >
                                    Generate Code
                                </Button>
                                <ErrorMessage name="code" component="div" className="error" style={{ color: 'red', marginTop: 5 }} />
                            </Box>

                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Product Name"
                                    variant="outlined"
                                    placeholder="Enter Product Name"
                                    onChange={(e) => setFieldValue("name", e.target.value)}
                                />
                                <ErrorMessage name="name" component="div" className="error" style={{ color: 'red', marginTop: 5 }} />
                            </Box>

                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    name="excerpt"
                                    label="Excerpt"
                                    variant="outlined"
                                    placeholder="Enter Excerpt"
                                    onChange={(e) => setFieldValue("excerpt", e.target.value)}
                                />
                                <ErrorMessage name="excerpt" component="div" className="error" style={{ color: 'red', marginTop: 5 }} />
                            </Box>

                            <Box mb={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        label="Category"
                                        name="category"
                                        onChange={(e) => setFieldValue("category", e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select Category</em>
                                        </MenuItem>
                                        {categories.map(category => (
                                            <MenuItem key={category._id} value={category._id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <ErrorMessage name="category" component="div" className="error" style={{ color: 'red', marginTop: 5 }} />
                            </Box>

                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    type="number"
                                    variant="outlined"
                                    placeholder="Enter Price"
                                    onChange={(e) => setFieldValue("price", e.target.value)}
                                />
                                <ErrorMessage name="price" component="div" className="error" style={{ color: 'red', marginTop: 5 }} />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}

export default AddProducts;

// // src/components/AddProducts.js
// import React from 'react';
// import axios from 'axios';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { TextField, Button, Container, Typography } from '@mui/material';

// const validationSchema = Yup.object({
//   code: Yup.string().required('Code is required'),
//   name: Yup.string().min(3, 'Minimum 3 characters').max(30, 'Maximum 30 characters').required('Name is required'),
//   excerpt: Yup.string().required('Excerpt is required'),
//   category: Yup.string().required('Category is required'),
//   price: Yup.number().min(0, 'Price cannot be negative').max(100000, 'Price cannot exceed 100,000').required('Price is required'),
// });

// const AddProducts = () => {
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       await axios.post('http://localhost:3000/api/v1/products', values);
//       // Optionally, handle success (e.g., show a success message, clear the form, etc.)
//     } catch (error) {
//       console.error('Error adding product', error);
//       // Optionally, handle error (e.g., show an error message to the user)
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Add Product</Typography>
//       <Formik
//         initialValues={{ code: '', name: '', excerpt: '', category: '', price: '' }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div style={{ marginBottom: '1rem' }}>
//               <Field
//                 name="code"
//                 as={TextField}
//                 label="Code"
//                 fullWidth
//                 required
//                 variant="outlined"
//               />
//               <ErrorMessage name="code" component="div" className="error" />
//             </div>
//             <div style={{ marginBottom: '1rem' }}>
//               <Field
//                 name="name"
//                 as={TextField}
//                 label="Name"
//                 fullWidth
//                 required
//                 variant="outlined"
//               />
//               <ErrorMessage name="name" component="div" className="error" />
//             </div>
//             <div style={{ marginBottom: '1rem' }}>
//               <Field
//                 name="excerpt"
//                 as={TextField}
//                 label="Excerpt"
//                 fullWidth
//                 required
//                 variant="outlined"
//               />
//               <ErrorMessage name="excerpt" component="div" className="error" />
//             </div>
//             <div style={{ marginBottom: '1rem' }}>
//               <Field
//                 name="category"
//                 as={TextField}
//                 label="Category"
//                 fullWidth
//                 required
//                 variant="outlined"
//               />
//               <ErrorMessage name="category" component="div" className="error" />
//             </div>
//             <div style={{ marginBottom: '1rem' }}>
//               <Field
//                 name="price"
//                 as={TextField}
//                 label="Price"
//                 type="number"
//                 fullWidth
//                 required
//                 variant="outlined"
//               />
//               <ErrorMessage name="price" component="div" className="error" />
//             </div>
//             <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Container>
//   );
// };

// export default AddProducts;
