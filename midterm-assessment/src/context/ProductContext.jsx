// src/context/ProductContext.js
import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const refreshProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ products, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
