// src/pages/shop/[category].js
"use client"; // Ensures this component is a client component

import React, { useEffect, useState } from 'react';
// import CustomizePage from '@/shop/CustomizePage'; // Path to CustomizePage moved to shop folder
import CustomizePage from './CustomizePage';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';
import { useRouter } from 'next/router';  // To read dynamic category from URL
import { fetchCategoryData } from '@/fetchData';  // Fetch data based on category

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query; // Grab the category from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      const loadCategoryData = async () => {
        const productsData = await fetchCategoryData(category); // Fetch data based on the category
        setProducts(productsData);
      };
      loadCategoryData();
    }
  }, [category]); // This hook will run whenever the category changes

  if (!category) return <p>Loading...</p>; // Wait for category to be fetched

  return (
    <>
      <Nav />
      <CustomizePage title={category} description={`Shop ${category}`} products={products} />
      <Footer />
    </>
  );
};

export default CategoryPage;
