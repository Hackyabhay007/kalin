// src/redux/slices/currencySlice.js
import { createSlice } from '@reduxjs/toolkit';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    conversionRate: 1, // default to 1 for INR
    selectedCurrency: 'INR',
  },
  reducers: {
    setConversionRate: (state, action) => {
      state.conversionRate = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const { setConversionRate, setSelectedCurrency } = currencySlice.actions;

export default currencySlice.reducer;
