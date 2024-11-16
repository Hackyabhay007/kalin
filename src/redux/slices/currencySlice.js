import { createSlice } from "@reduxjs/toolkit";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    conversionRate: 1, // Default conversion rate (1 INR to 1 INR)
    selectedCurrency: "INR", // Default selected currency
    lastUpdated: null, // Timestamp of last update
  },
  reducers: {
    setConversionRate: (state, action) => {
      state.conversionRate = action.payload.rate;
      state.lastUpdated = action.payload.timestamp;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
      // Reset conversion rate for INR
      if (action.payload === "INR") {
        state.conversionRate = 1;
      }
    },
    resetCurrency: (state) => {
      state.conversionRate = 1;
      state.selectedCurrency = "INR";
    },
  },
});

export const { setConversionRate, setSelectedCurrency, resetCurrency } = currencySlice.actions;
export default currencySlice.reducer;
