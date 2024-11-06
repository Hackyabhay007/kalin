// src/pages/customize/[category].js
"use client"; // Ensures this component is a client component

import React, { useEffect, useState } from 'react';
import CustomizePage from './CustomizePage';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';
import { fetchCategoryData } from '@/fetchData';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchCategoryData(); // Fetch the products
      setProducts(productsData);
    };
    loadProducts();
  }, []);

  return (
    <>
      <Nav />
      <CustomizePage title="Shop" description="shop now" products={products} />
      <Footer />
    </>
  );
};

export default CategoryPage;
