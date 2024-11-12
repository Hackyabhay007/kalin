// src/pages/cart/Cart.jsx
import Link from "next/link";
import React from "react";
import { useCart } from "@/context/CartContext"; // Import useCart from CartContext
import Image from "next/image"; // Import Image from Next.js
import { useRouter } from "next/router"; // Import useRouter from Next.js
import { useSelector } from "react-redux"; 


function Cart() {
  const { cartItems, removeFromCart } = useCart(); // Get cartItems and removeFromCart function from useCart
  const router = useRouter(); // Initialize router
 
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };
  const { conversionRate, selectedCurrency } = useSelector(
    (state) => state.currency
  ); 
  const total = calculateTotal();

  const handleBuyNow = (item) => {
    // Navigate to checkout page with product details as query parameters
    router.push({
      pathname: '/checkout',
      query: {
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1, // Default quantity if not provided
        size: item.size || 'default size', // Default size if not provided
        color: item.color || 'default color', // Default color if not provided
      },
    });
  };

  return (
    <div className="bg-white px-4 py-8 min-h-96 flex flex-col md:flex-row">
      {/* Left Side: Cart Items */}
      <div className="flex-1 mb-8 md:mb-0 md:mr-8">
        <h2 className="text-2xl text-center font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-8">Your cart is empty</p>
            <Link href="/customize/Shop">
              <button className="bg-gray-100 text-black px-4 py-2 rounded border hover:bg-black hover:border-black hover:text-white">
                Back to Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="p-4 text-center relative">
                <Image
                  src={item.imgSrc}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="h-56 object-contain mb-2 rounded-md"
                />
                <h3 className="text-sm mb-1">{item.name}</h3>
                <p className="text-sm text-gray-700">{item.size}</p>
                <p className="text-sm text-gray-700">{selectedCurrency === "INR" ? "₹" : "$"}{" "}
                {(item.price * conversionRate).toFixed(2)}</p>
                
                <button
                  onClick={() => handleBuyNow(item)}
                  className="bg-black text-white mt-2 px-4 py-2"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-black shadow-inner shadow-gray-300 border border-black rounded ml-5 px-2 p-1 hover:bg-black hover:text-white"
                >
                  <i className="ri-delete-bin-line text-xl"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Billing & Order Form */}
      <div className="flex-1 p-6 h-fit text-sm text-black border border-black">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

        {/* Subtotal and Total */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-start">Subtotal</span>
            <span className="text-end">{selectedCurrency === "INR" ? "₹" : "$"}{" "}
            {(total * conversionRate).toFixed(2)}</span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between font-semibold mt-2">
            <span>Total</span>
            <span>{selectedCurrency === "INR" ? "₹" : "$"}{" "}
            {(total * conversionRate).toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Information */}
        <h3 className="my-2 font-semibold text-lg">Delivery</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Country/Region
          </option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">United Kingdom</option>
          <option value="Australia">Australia</option>
        </select>

        {/* Name Fields */}
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Address Fields */}
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Landmark"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* State and Pin Code Fields */}
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="City"
            className="w-1/3 p-2 border border-gray-300 rounded-md"
          />
          <select className="w-1/3 p-2 border border-gray-300 rounded-md">
            <option>State</option>
            <option>Delhi</option>
            <option>Maharashtra</option>
          </select>
          <input
            type="text"
            placeholder="Pin Code"
            className="w-1/3 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Phone Number */}
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Payment Options */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment</h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" />
              Online Payment
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-2" />
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Free Shipping */}
        <p className="text-gray-800 mb-4">
          <i className="ri-truck-line text-xl"></i> Free Shipping
        </p>

        {/* Order Buttons */}
        <div className="flex flex-col space-y-4">
          <button className="bg-black text-white px-4 py-4 w-full">
            Proceed to Order
          </button>
          <Link href="/customize/Shop">
            <button className="bg-gray-100 text-black px-4 py-4 w-full border border-gray-300">
              Back to Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
