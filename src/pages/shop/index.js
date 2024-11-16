"use client"; // Ensures this component is a client component

import React, { useEffect, useState } from 'react';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';
import CustomizePage from './CustomizePage';
import { fetchCategoryData } from '@/fetchData';  // Replace with actual fetching logic for main page
import Head from 'next/head'; // Import next/head for SEO tags

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
      {/* SEO Tags for the Shop Page */}
      <Head>
        <title>Shop Sannuri Rugs - Hand-Knotted Luxury Rugs and Carpets</title>
        <meta
          name="description"
          content="Explore Sannuri Rugs' premium collection of hand-knotted rugs and carpets. Shop now to find customizable options with unique designs in wool, silk, and cotton."
        />
        <meta
          name="keywords"
          content="hand-knotted rugs, luxury rugs, premium carpets, wool rugs, silk rugs, cotton rugs, custom rugs, Sannuri Rugs, high-quality carpets, carpets"
        />
        <meta name="author" content="Sannuri Rugs" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Shop Sannuri Rugs - Premium Hand-Knotted Rugs" />
        <meta
          property="og:description"
          content="Discover premium hand-knotted rugs at Sannuri Rugs. Customizable designs in various materials, including wool, silk, and cotton."
        />
        <meta property="og:image" content="/local/images/logo.png" />
        <meta property="og:url" content="https://sanurrirugs.com/shop" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:title" content="Shop Sannuri Rugs - Hand-Knotted Luxury Rugs" />
        <meta
          name="twitter:description"
          content="Browse luxurious hand-knotted rugs and carpets. Customize your rug with various options from Sannuri Rugs."
        />
        <meta name="twitter:image" content="/local/images/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav />
      <CustomizePage title="Shop" description="Shop Now" products={products} />
      <Footer />
    </>
  );
}
