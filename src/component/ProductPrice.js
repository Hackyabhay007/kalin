// src/components/ProductPrice.js
import React from 'react';
import { useSelector } from 'react-redux';

const ProductPrice = ({ priceInINR }) => {
  const { conversionRate, selectedCurrency } = useSelector((state) => state.currency);

  const convertedPrice = (priceInINR * conversionRate).toFixed(2);

  return (
    <p>
      Price: {selectedCurrency} {convertedPrice}
    </p>
  );
};

export default ProductPrice;
