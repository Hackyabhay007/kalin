// src/pages/shop/index.js
"use client"; // Ensures this component is a client component

import React, { useEffect, useState } from 'react';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';
// import CustomizePage from '@/shop/CustomizePage'; // Path to CustomizePage moved to shop folder
import CustomizePage from './CustomizePage';
import { fetchCategoryData } from '@/fetchData';  // Replace with actual fetching logic for main page

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchCategoryData(); // Fetch all products for the shop
      setProducts(productsData);
    };
    loadProducts();
  }, []);

  return (
    <>
      <Nav />
      <CustomizePage title="Shop" description="Shop Now" products={products} />
      <Footer />
    </>
  );
}
