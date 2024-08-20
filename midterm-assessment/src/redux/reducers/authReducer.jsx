// src/redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE, SET_LOADING } from '../actions/type';

const initialState = {
  user: null,
  error: null,
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, user: action.payload, error: null };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
