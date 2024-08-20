import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import './App.css';

// Eagerly-loaded components
import Register from './components/Register';
import Login from './components/Login';
import Members from './components/Members';

// Lazy-loaded components
const AddProducts = lazy(() => import('./components/AddProducts'));
const ShowProducts = lazy(() => import('./components/ShowProducts'));
const CategoryList = lazy(() => import('./components/CategoryList'));
const CategoryForm = lazy(() => import('./components/CategoryForm'));
const CategoryManagement = lazy(() => import('./components/CategoryManagement'));

function App() {
  return (
    <Router>
      <Container>
        <Typography variant="h2" gutterBottom className='h2'>
          My E-commerce App
        </Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Register />} />
            <Route path="/members" element={<Members />} />
            <Route path="/add-product" element={<AddProducts />} />
            <Route path="/show-products" element={<ShowProducts />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/category-form/:categoryId?" element={<CategoryForm />} />
            <Route path="/add-category" element={<CategoryManagement />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;
