import React, { useState, useEffect } from "react";
import Filter from "@/component/Filter";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; // Import useCart from CartContext
import { useSelector } from "react-redux"; // Import useSelector for currency data
import { useRouter } from "next/router";
function CustomizePage({
  title = "Shop",
  description = "",
  products = [],
}) {
  const { addToCart } = useCart(); // Destructure addToCart from useCart
  
  const { conversionRate, selectedCurrency } = useSelector(
    (state) => state.currency
  ); // Access currency and conversion rate from Redux
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    sizes: [],
    categories: [],
    colors: [],
    sortOrder: "asc", // Default sort order
  });
  const itemsPerPage = 8;

  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);
  const router = useRouter();
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    const query = {};

    if (newFilters.sizes.length > 0) query.size = newFilters.sizes.join(",");
    if (newFilters.categories.length > 0) query.category = newFilters.categories.join(",");
    if (newFilters.colors.length > 0) query.color = newFilters.colors.join(",");
    if (newFilters.sortOrder) query.sortOrder = newFilters.sortOrder;

    router.push({
      pathname: "/shop",
      query: query,
    });
  };

  // Fetch data based on query parameters
  useEffect(() => {
    const { category, size, color, sortOrder } = router.query;
    setFilters({
      categories: category ? category.split(",") : [],
      sizes: size ? size.split(",") : [],
      colors: color ? color.split(",") : [],
      sortOrder: sortOrder || "asc",
    });
  }, [router.query]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSize =
        filters.sizes.length === 0 ||
        product.sizes.some((productSize) =>
          filters.sizes.includes(productSize)
        );

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.some((filterCategory) =>
          product.category.some(
            (productCategory) =>
              productCategory.toLowerCase() === filterCategory.toLowerCase()
          )
        );

      const matchesColor =
        filters.colors.length === 0 ||
        (product.color &&
          product.color.some((productColor) =>
            filters.colors.some(
              (filterColor) =>
                filterColor.toLowerCase() === productColor.toLowerCase()
            )
          ));

      console.log("Product:", product);
      console.log("Matches Size:", matchesSize);
      console.log("Matches Category:", matchesCategory);
      console.log("Matches Color:", matchesColor);

      return matchesSize && matchesCategory && matchesColor;
    })
    .sort((a, b) => {
      if (filters.sortOrder === "asc") return a.price - b.price;
      if (filters.sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
        <Filter onApply={handleFiltersChange} />
      </div>

      <button
        onClick={toggleMobileFilter}
        className="bg-white border m-5 border-black text-black px-4 py-2 mb-4 md:hidden"
        aria-label="Toggle filter"
      >
        Filter
      </button>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex justify-end md:hidden">
          <div className="bg-white w-full p-5 h-full overflow-y-auto">
            <Filter
              onApply={(filters) => {
                handleFiltersChange(filters);
                toggleMobileFilter(); // Close filter on apply
              }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 p-5 md:ml-72">
        <h2 className="text-2xl text-center font-semibold mb-2">{title}</h2>
        <p className="text-center text-gray-700 mb-6">{description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <Link href={`/shop/product_view/${product.id}`}>
                <Image
                  src={product.imgSrc}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="h-56 object-contain"
                />
              </Link>
              <p className="mt-2 text-center">{product.name}</p>

              {/* Display converted price based on selected currency */}
              <p className="text-gray-600">
                {selectedCurrency === "INR" ? "₹" : "$"}{" "}
                {(product.price * conversionRate).toFixed(2)}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-2"
                aria-label="Add to cart"
              >
                <i className="ri-add-circle-line text-xl hover:bg-black hover:text-white hover:rounded-full transition-all duration-1000 delay-200"></i>

              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-black disabled:opacity-50"
              aria-label="Previous page"
            >
              Prev
            </button>
            {Array.from(
              { length: endPage - startPage + 1 },
              (_, index) => startPage + index
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white border border-black"
                    : "bg-gray-100 border border-black text-black"
                }`}
                aria-label={`Page ${pageNumber}`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-100 border border-black disabled:opacity-50"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomizePage;
