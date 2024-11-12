// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import currencyReducer from './slices/currencySlice'; // Add this import for currency slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currency: currencyReducer, // Add currency reducer here
  },
});
