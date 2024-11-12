import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux"; 
function Checkout() {
  const router = useRouter();
  const { conversionRate, selectedCurrency } = useSelector(
    (state) => state.currency
  ); 
  const { name, price, quantity, size, color } = router.query;

  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md mt-8">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column - Billing Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-gray-700">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={billingDetails.firstName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={billingDetails.lastName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">
              Country<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={billingDetails.country}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">
              Street Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
                name="streetAddress"
              value={billingDetails.streetAddress}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-full">
              <label className="block text-gray-700">
                Town / City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={billingDetails.city}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700">
                State<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={billingDetails.state}
                onChange={handleInputChange}
                className="border border-gray-300 rounded w-full p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">
              Postcode / Zip<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              value={billingDetails.zipCode}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
              required
            />
          </div>

          <button className="mt-6 w-full bg-black text-white py-2 rounded">
            Submit Billing Details
          </button>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>

          <div className="border-b border-gray-300 pb-2">
            <div className="flex justify-between font-semibold">
              <span>Product</span>
              <span>Total</span>
            </div>
          </div>

          {/* Cart Items */}
          <div className="border-b border-gray-300 py-2 space-y-2">
            <div className="flex justify-between">
              <span>{name}</span>
              <span>{selectedCurrency === "INR" ? "₹" : "$"}{" "}
              {(price * conversionRate).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Size: {size}</span>
              <span>Color: {color}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Quantity: {quantity}</span>
              <span>Subtotal: {selectedCurrency === "INR" ? "₹" : "$"}{" "}
              {((price* quantity) * conversionRate).toFixed(2)}</span>
              
            </div>
          </div>

          {/* Subtotal */}
          <div className="border-b border-gray-300 py-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{selectedCurrency === "INR" ? "₹" : "$"}{" "}
              {((price* quantity) * conversionRate).toFixed(2)}</span>
            </div>
          </div>

          {/* Discount */}
          <div className="border-b border-gray-300 py-2">
            <div className="flex justify-between">
              <span>Discount</span>
              <span>00.00</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-b border-gray-300 py-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{selectedCurrency === "INR" ? "₹" : "$"}{" "}
              {((price* quantity) * conversionRate).toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="border-b border-gray-300 py-4 flex flex-col space-y-2">
            <div className="flex items-center">
              <input type="radio" name="payment" id="online" />
              <label htmlFor="online" className="ml-2">Online Payment</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="payment" id="cod" />
              <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
            </div>
          </div>

          {/* Place Order Button */}
          <button className="mt-4 w-full bg-black text-white py-2 rounded">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
