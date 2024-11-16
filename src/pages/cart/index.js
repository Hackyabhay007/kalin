import React from 'react';
import Nav from "@/component/Nav";
import Cart from "./Cart";
import Footer from "@/component/Footer";
import Head from 'next/head';  // Import next/head for SEO tags

export default function CartPage(params) {
  return (
    <>
      {/* SEO Tags for the Cart Page */}
      <Head>
        <title>Shopping Cart - Sannuri Rugs</title>
        <meta
          name="description"
          content="Review and manage your selections in your cart at Sannuri Rugs. Customize your hand-knotted rug purchase with options like size, color, and material."
        />
        <meta
          name="keywords"
          content="shopping cart, buy rugs online, Sannuri Rugs cart, customizable rugs, hand-knotted rugs, premium rugs, carpet shopping, rug purchase"
        />
        <meta name="author" content="Sannuri Rugs" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Shopping Cart - Sannuri Rugs" />
        <meta
          property="og:description"
          content="View and manage your rug selections in the cart. Choose your perfect rug with customizable options at Sannuri Rugs."
        />
        <meta property="og:image" content="/local/images/logo.png" />  {/* Update with your preferred image */}
        <meta property="og:url" content="https://sanurrirugs.com/cart" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:title" content="Shopping Cart - Sannuri Rugs" />
        <meta
          name="twitter:description"
          content="Review your rug selections and customize your purchase. Sannuri Rugs offers hand-knotted luxury rugs with personalized options."
        />
        <meta name="twitter:image" content="/local/images/logo.png" />  {/* Update with your preferred image */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav />
      <Cart />
      <Footer />
    </>
  );
}
