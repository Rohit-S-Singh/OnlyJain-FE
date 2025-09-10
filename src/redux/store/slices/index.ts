
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Combine reducers (if you have more in the future)
const rootReducers = combineReducers({
    auth: authReducer,
  });

  export default rootReducers;
