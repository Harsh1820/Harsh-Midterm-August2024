import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const SearchBar = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DetailsContainer = styled.div`
  position: fixed;
  top: 20%;
  right: 20px;
  width: 300px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const DetailsHeader = styled.h3`
  margin-top: 0;
`;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/categories');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/categories/${id}`);
      setCategories(prevCategories => prevCategories.filter(cat => cat._id !== id)); // Ensure _id matches your API
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleViewDetails = (category) => {
    setDetails(category);
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Description', selector: row => row.description },
    { name: 'Actions', cell: row => (
      <>
        <Button onClick={() => handleViewDetails(row)}>View</Button>
        <Button onClick={() => handleDelete(row._id)}>Delete</Button> {/* Ensure _id matches your API */}
      </>
    )}
  ];

  return (
    <Container>
      <Header>Categories</Header>
      <SearchBar
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <DataTable
        columns={columns}
        data={filteredCategories}
        pagination
        highlightOnHover
      />
      {details && (
        <DetailsContainer>
          <DetailsHeader>Category Details</DetailsHeader>
          <p><strong>Name:</strong> {details.name}</p>
          <p><strong>Description:</strong> {details.description}</p>
          <Button onClick={() => setDetails(null)}>Close</Button>
        </DetailsContainer>
      )}
    </Container>
  );
};

export default CategoryList;
