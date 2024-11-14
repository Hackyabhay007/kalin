import React from 'react';

function Track_order() {
  return (
    <div className="flex justify-center items-center  bg-white px-5 py-10">
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
        <button className="w-full py-3 bg-black text-white rounded-sm hover:bg-white hover:text-black border border-black transition-colors mb-6">
          Track My Order
        </button>

        {/* Order Tracking Progress */}
        <div className="relative flex flex-col sm:flex-row items-center sm:justify-between my-6">
          {/* Connecting line */}
          <div className="absolute sm:top-4 sm:left-0 sm:right-0 sm:h-1 sm:w-full bg-black w-1 h-full top-0 left-1/2 transform -translate-x-1/2 sm:translate-x-0 z-0"></div>
          
          {/* Step 1: Order Placed */}
          <div className="flex items-center justify-center relative z-10 mb-4 sm:mb-0">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-xl"></i>
            </div>
            <span className="absolute font-semibold sm:top-10 top-0 sm:left-0 left-10 text-sm">Order Placed</span>
          </div>

          {/* Step 2: Order Shipped */}
          <div className="flex items-center justify-center relative z-10 mb-4 sm:mb-0">
            <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
              <i className="ri-box-3-line text-xl"></i>
            </div>
            <span className="absolute  sm:top-10 top-0 sm:left-0 left-10 text-sm">Shipped</span>
          </div>

          {/* Step 3: Picked by Delivery Partner */}
          <div className="flex items-center justify-center relative z-10 mb-4 sm:mb-0">
            <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
              <i className="ri-truck-line text-xl"></i>
            </div>
            <span className="absolute  sm:top-10 top-0 sm:left-0 left-10 text-sm">Picked</span>
          </div>

          {/* Step 4: Out for Delivery */}
          <div className="flex items-center justify-center relative z-10 mb-4 sm:mb-0">
            <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
              <i className="ri-riding-line text-xl"></i>
            </div>
            <span className="absolute  sm:top-10 top-0 sm:left-0 left-10 text-sm">Out for Delivery</span>
          </div>

          {/* Step 5: Delivered */}
          <div className="flex items-center justify-center relative z-10">
            <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center">
              <i className="ri-home-smile-line text-xl"></i>
            </div>
            <span className="absolute  sm:top-10 top-0 sm:left-0 left-10 text-sm">Delivered</span>
          </div>
        </div>

        {/* View Order Button */}
        <button className="w-full md:mt-14 py-3 bg-black text-white rounded-sm hover:bg-white hover:text-black border border-black transition-colors">
          View Order
        </button>
      </div>
    </div>
  );
}

export default Track_order;
