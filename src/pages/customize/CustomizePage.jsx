import React, { useState } from 'react';
import Filter from '@/component/Filter';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from Next.js

function CustomizePage({ title = "Customize", description = "This section allows you to customize your selections dynamically.", products = [] }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate the start and end of page range for pagination
  const pageRange = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  return (
    <div className="md:flex min-h-[900px]">
      <div className="hidden md:block absolute top-20 left-0 w-72 h-screen bg-white">
        <Filter />
      </div>

      <button
        onClick={toggleMobileFilter}
        className="bg-white border m-5 border-black text-black px-4 py-2 mb-4 md:hidden"
      >
        Filter
      </button>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex justify-end md:hidden">
          <div className="bg-white w-full p-5 h-full overflow-y-auto">
            <Filter onApply={toggleMobileFilter} />
          </div>
        </div>
      )}

      <div className="flex-1 p-5 md:ml-72">
        <h2 className="text-2xl text-center font-semibold mb-2">{title}</h2>
        <p className="text-center text-gray-700 mb-6">{description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <Link href={`/customize/product_view/${product.id}`}> {/* Wrap the product image with a Link */}
                <Image
                  src={product.imgSrc}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="h-56 object-contain"
                />
              </Link>
              <p className="mt-2 text-center">{product.name}</p>
              <p className="text-gray-600">{product.price}</p>
              <button className="mt-2">
                <i className="ri-add-circle-line text-2xl"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-black  disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-1  ${currentPage === pageNumber ? 'bg-blue-500 text-white border border-black' : 'bg-gray-100 border border-black text-black'}`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-100 border border-black disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomizePage;
