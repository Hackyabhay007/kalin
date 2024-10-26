"use client"
import React from 'react';
function Filter({ onApply }) {
  return (
    <div className="bg-white text-black font-thin h-auto p-5 w-72 overflow-y-scroll" style={{
        scrollbarWidth: 'none',         // Hides scrollbar in Firefox
        msOverflowStyle: 'none',        // Hides scrollbar in IE and Edge
        overflow: '-moz-hidden-unscrollable', // Hides scrollbar in Firefox (old versions)
      }}>
      <h2 className="text-lg font-semibold mb-4">Filter by</h2>
      <hr className="border-black mb-4" />

      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Sort by</h3>
        <div className="flex gap-2 mb-2">
          <button className="bg-white text-black border border-black px-3 py-1">Newest Rugs</button>
          <button className="bg-white text-black border border-black px-3 py-1">Popular Rugs</button>
        </div>
        <hr className="border-black" />
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Price</h3>
        <div className="flex flex-col gap-2">
          <button className="border border-black rounded-none py-1 px-2">Low to High</button>
          <button className="border border-black rounded-none py-1 px-2">High to Low</button>
        </div>
        <hr className="border-black mt-4" />
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Size (FT.)</h3>
        <div className="flex flex-col gap-2">
          {['2*3 (9)', '4*6 (15)', '5*8 (12)', '6*9 (10)', '8*10 (7)', '10*12 (5)'].map((size, index) => (
            <label key={index} className="flex items-center gap-2">
              <input type="checkbox" className="border h-6 w-6 border-black" />
              {size}
            </label>
          ))}
        </div>
        <hr className="border-black mt-4" />
      </div>

      <div className="mb-4">
        <h3 className="text-base font-semibold mb-2">Color</h3>
        <div className="flex flex-col gap-2">
          {[
            { color: 'gray', label: 'Gray' },
            { color: 'orange', label: 'Orange' },
            { color: 'blue', label: 'Blue' },
            { color: 'green', label: 'Green' },
            { color: 'purple', label: 'Purple' },
            { color: 'red', label: 'Red' }
          ].map((item, index) => (
            <label key={index} className="flex items-center gap-2">
              <input type="checkbox" className="w-6 h-6 border border-black" />
              <div className={`w-6 h-6 bg-${item.color}-500`}></div>
              <span className="text-black">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={onApply}
          className="w-full border border-black py-2 text-center rounded-none"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default Filter;
