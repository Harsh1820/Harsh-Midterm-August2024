import React from 'react';
import { Container, Tabs, Tab } from '@mui/material';
import { Route, Routes, Link } from 'react-router-dom';
import CategoryManagement from './CategoryManagement'; // Import your CategoryManagement component
import AddProducts from './AddProducts'; // Import your AddProducts component

const AdminArea = () => {
  return (
    <Container>
      <Tabs>
        <Tab label="Manage Categories" component={Link} to="/admin/categories" />
        <Tab label="Add Products" component={Link} to="/admin/products" />
      </Tabs>
      <Routes>
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/products" element={<AddProducts />} />
      </Routes>
    </Container>
  );
};

export default AdminArea;
