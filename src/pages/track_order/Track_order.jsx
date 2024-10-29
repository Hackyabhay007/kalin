import React from 'react';

function Track_order() {
  return (
    <div className="flex justify-center items-center min-h-fit bg-white px-5 py-10">
      <div className="w-full max-w-xl bg-white text-center">
        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-6">Track Order</h1>
        
        {/* Email ID Input */}
        <label className="block text-left mb-2 font-medium">Enter email ID</label>
        <input 
          type="email" 
          className="w-full py-3 px-3 mb-6 border border-gray-500 rounded-sm focus:outline-none focus:border-gray-500" 
        />
        
        {/* Order Number Input */}
        <label className="block text-left mb-2 font-medium">Order Number</label>
        <input 
          type="text" 
          className="w-full py-3 px-3 mb-8 border border-gray-500 rounded-sm focus:outline-none" 
        />
        
        {/* Track My Order Button */}
        <button className="w-full py-3 bg-black text-white rounded-sm hover:bg-white hover:text-black border border-black transition-colors">
          Track My Order
        </button>
      </div>
    </div>
  );
}

export default Track_order;
