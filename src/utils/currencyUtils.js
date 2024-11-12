// src/utils/currencyUtils.js
import { setConversionRate } from '@/redux/slices/currencySlice'; // adjust path based on your setup

export const fetchConversionRate = async (dispatch, baseCurrency = 'INR', targetCurrency = 'USD') => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`
    );

    if (!response.ok) throw new Error('Failed to fetch conversion rate');

    const data = await response.json();
    const rate = data.conversion_rates[targetCurrency];
    dispatch(setConversionRate(rate));
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
  }
};
