// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './redux/store'; // Adjust the import path if needed
// import App from './App';
// import { ProductProvider } from './context/ProductContext'; // Import the ProductProvider

// ReactDOM.render(
//   <Provider store={store}>
//     <ProductProvider>
//       <App />
//     </ProductProvider>
//   </Provider>,
//   document.getElementById('root')
// );

// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
// import { ProductProvider } from './context/ProductContext';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
