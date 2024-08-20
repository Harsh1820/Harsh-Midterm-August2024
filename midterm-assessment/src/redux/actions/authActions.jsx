// src/redux/actions/authActions.js
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, SET_LOADING } from './type';

const API_URL = 'http://localhost:3000/api/v1/users';
const reg_url = 'http://localhost:3000/api/v1/auth'
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.post(`${reg_url}/login`, { username, password });
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const register = (displayName, email, username, password, role) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await axios.post(`${API_URL}`, { displayName, email, username, password, role });
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response.data });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};


// // src/redux/actions/authActions.js
// import axios from 'axios';
// import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, SET_LOADING } from './type';

// const API_URL = 'http://localhost:3000/api/v1/auth';

// export const login = (username, password) => async (dispatch) => {
//   dispatch({ type: SET_LOADING, payload: true });
//   try {
//     const response = await axios.post(`${API_URL}/login`, { username, password });
//     dispatch({ type: LOGIN_SUCCESS, payload: response.data });
//   } catch (error) {
//     console.error('Login failed:', error); // Log error for debugging
//     const errorMessage = error.response ? error.response.data : 'Login failed. Please try again later.';
//     dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
//   } finally {
//     dispatch({ type: SET_LOADING, payload: false });
//   }
// };

// export const register = (displayName, email, username, password, role) => async (dispatch) => {
//   dispatch({ type: SET_LOADING, payload: true });
//   try {
//     const response = await axios.post(`${API_URL}/register`, { displayName, email, username, password, role });
//     dispatch({ type: REGISTER_SUCCESS, payload: response.data });
//   } catch (error) {
//     console.error('Registration failed:', error); // Log error for debugging
//     const errorMessage = error.response ? error.response.data : 'Registration failed. Please try again later.';
//     dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
//   } finally {
//     dispatch({ type: SET_LOADING, payload: false });
//   }
// };
