// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers/index'; // Assuming you combine reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


// import { applyMiddleware, createStore } from 'redux';
// import {thunk} from 'redux-thunk'; // Named import, not default
// import authReducer from './reducers/authReducer';

// const store = createStore(authReducer, applyMiddleware(thunk));

// export default store;
