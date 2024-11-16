const ProductPrice = ({ priceInINR }) => {
  const { conversionRate, selectedCurrency } = useSelector((state) => state.currency);

  // Prevent rendering incorrect data
  if (!conversionRate || !selectedCurrency) {
    return <p>Loading...</p>; // Placeholder while state initializes
  }

  const convertedPrice = selectedCurrency === "INR" ? priceInINR : (priceInINR * conversionRate).toFixed(2);

  return (
    <p>
      Price: {selectedCurrency === "INR" ? "₹" : "$"} {convertedPrice}
    </p>
  );
};
