"use client"; // Ensures this component is a client component

import React, { useState } from 'react';
import Filter from '@/component/Filter';

function CustomizePage({ title = "Customize", description = "This section allows you to customize your selections dynamically.", products = [] }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);

  return (
    <div className="md:flex">
      {/* Sidebar for Filter in Desktop */}
      <div className="hidden md:block absolute top-20 left-0 w-72 h-screen bg-white ">
        <Filter />
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={toggleMobileFilter}
        className="bg-white border m-5 border-black text-black px-4 py-2 mb-4 md:hidden"
      >
        Filter
      </button>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex justify-end md:hidden">
          <div className="bg-white w-full p-5 h-full overflow-y-auto">
            <Filter onApply={toggleMobileFilter} />
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 p-5 md:ml-72">
        <h2 className="text-2xl text-center font-semibold mb-2">{title}</h2>
        
        {/* Description below heading */}
        <p className="text-center text-gray-700 mb-6">{description}</p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <img src={product.imgSrc} alt={product.description} className="w-full h-auto" />
              <p className="mt-2 text-center">{product.description}</p>
              <p className="text-gray-600">{product.price}</p>
              <button className="mt-2">
                <i className="ri-add-circle-line"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomizePage;
