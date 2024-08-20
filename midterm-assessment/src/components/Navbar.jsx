// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-commerce App
        </Typography>
        <Button color="inherit" component={Link} to="/add-product">Add Product</Button>
        <Button color="inherit" component={Link} to="/add-category">Add Category</Button>
        <Button color="inherit" component={Link} to="/show-products">Show Products</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
