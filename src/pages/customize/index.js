"use client"; // Ensures this component is a client component

import React from "react";
import Nav from "@/component/Nav";
import CustomizePage from "./CustomizePage"; // Adjust if path is different
import Footer from "@/component/Footer";

const products = [
  { id: 1, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 1' },
  { id: 2, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 2' },
  { id: 3, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 3' },
  { id: 4, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 4' },
  { id: 5, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 1' },
  { id: 6, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 2' },
  { id: 7, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 3' },
  { id: 8, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 4' },
  { id: 9, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 1' },
  { id: 10, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 2' },
  { id: 11, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 3' },
  { id: 12, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 4' },
];

export default function Customize() {
  return (
    <>
      <Nav />
      <CustomizePage 
        title="Customize" 
        description="" 
        products={products} // Passing products as a prop
      />
      <Footer />
    </>
  );
}
