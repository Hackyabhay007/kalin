"use client"; // Ensures this component is a client component

import React from 'react';
import Nav from "@/component/Nav";
import Footer from "@/component/Footer";
import Blog_cart from "./Blog_cart";
import Head from 'next/head'; // Import next/head for SEO tags

export default function Blog(params) {
  return (
    <>
      {/* SEO Tags for the Blog Page */}
      <Head>
        <title>Blog - Sannuri Rugs | Insights, Trends & More</title>
        <meta
          name="description"
          content="Stay updated with the latest trends, insights, and stories in the world of luxury hand-knotted rugs. Explore Sannuri Rugs' blog for design tips, product news, and more."
        />
        <meta
          name="keywords"
          content="rugs, luxury rugs, hand-knotted rugs, carpet trends, rug designs, interior design, sustainable rugs, wool rugs, silk rugs, Sannuri Rugs blog"
        />
        <meta name="author" content="Sannuri Rugs" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Sannuri Rugs Blog - Trends, Tips, and Stories" />
        <meta
          property="og:description"
          content="Read the latest blog posts from Sannuri Rugs. Discover design trends, insights, and stories about the world of hand-knotted luxury rugs."
        />
        <meta property="og:image" content="/local/images/logo.png" />  {/* Updated to .png */}
        <meta property="og:url" content="https://sanurrirugs.com/blog" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:title" content="Sannuri Rugs Blog - Insights & Trends" />
        <meta
          name="twitter:description"
          content="Explore the Sannuri Rugs blog for the latest trends and insights in luxury hand-knotted rugs and carpets."
        />
        <meta name="twitter:image" content="/local/images/logo.png" />  {/* Updated to .png */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav />
      {/* <BlogView/> */}
      <Blog_cart />
      <Footer />
    </>
  );
}
