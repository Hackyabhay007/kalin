import Footer from "@/component/Footer";
import Nav from "@/component/Nav";
import React from "react";
import HomeImg from "./homeImg/HomeIng";
import Categories from "./category/Categories";
import Color from "./Color/Color";
import Shop_size from "./Shop_size/Shop_size";
import Story from "./Story/Story";
import Customize from "./CustomizeHome/Customize";
import Video from "./Video/Video";
import Blog from "./Blog/Blog";
import Head from "next/head";  // Import next/head for SEO tags

export default function Home() {
  return (
    <>
      {/* SEO Tags for Home Page */}
      <Head>
        <title>Sannuri Rugs - Premium Quality Rugs </title>
        <meta
          name="description"
          content="Discover the finest collection of hand-knotted rugs at Sannuri Rugs. Customize your rug by size, color, material, and more. Explore our categories of luxury rugs today."
        />
        <meta
          name="keywords"
          content="hand-knotted rugs, customizable rugs, premium rugs, wool rugs, silk rugs, cotton rugs, Sannuri Rugs, sustainable rugs, luxury rugs, Indian rugs, high-quality carpets"
        />
        <meta name="author" content="Sannuri Rugs" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Premium Hand-Knotted Rugs - Sannuri Rugs" />
        <meta
          property="og:description"
          content="Explore the best hand-knotted rugs with customizable options. Sannuri Rugs offers a wide selection of luxury rugs made from wool, silk, and cotton."
        />
        <meta property="og:image" content="/local/images/logo.png" />  {/* Update with your preferred image */}
        <meta property="og:url" content="https://sanurrirugs.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Tags */}
        <meta name="twitter:title" content="Premium Hand-Knotted Rugs - Sannuri Rugs" />
        <meta
          name="twitter:description"
          content="Shop customizable luxury hand-knotted rugs from Sannuri Rugs. High-quality wool, silk, and cotton rugs to enhance your home decor."
        />
        <meta name="twitter:image" content="/local/images/logo.png" />  {/* Update with your preferred image */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav />
      <HomeImg />
      <Categories />
      <Color />
      <Shop_size />
      <Story />
      <Customize />
      <Video />
      <Blog />
      <Footer />
    </>
  );
}
