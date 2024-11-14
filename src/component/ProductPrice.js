import React from 'react';
import { useSelector } from 'react-redux';

const ProductPrice = ({ priceInINR }) => {
  const { conversionRate, selectedCurrency } = useSelector((state) => state.currency);

  // Convert the price to the selected currency
  const convertedPrice = selectedCurrency === 'INR' ? priceInINR : (priceInINR * conversionRate).toFixed(2);

  return (
    <p>
      Price: {selectedCurrency === 'INR' ? '₹' : '$'} {convertedPrice}
    </p>
  );
};

export default ProductPrice;
