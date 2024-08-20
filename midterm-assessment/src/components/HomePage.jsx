import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { TextField, Container } from '@mui/material';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: 'Code', selector: row => row.code, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Excerpt', selector: row => row.excerpt },
    { name: 'Category', selector: row => row.category },
    { name: 'Price', selector: row => row.price, sortable: true },
    { name: 'Created At', selector: row => moment(row.created_at).format('DD-MM-YYYY') }
  ];

  return (
    <Container>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        highlightOnHover
        progressPending={loading}
      />
    </Container>
  );
};

export default HomePage;
