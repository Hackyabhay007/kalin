"use client"; // Ensures this component is a client component

import React from 'react';
import CustomizePage from './CustomizePage';
import Nav from '@/component/Nav';
import Footer from '@/component/Footer';

const categoryData = {
  'hand-knotted': {
    title: "Hand Knotted",
    description: "Hand-knotted rugs are crafted by skilled artisans who tie each knot by hand, resulting in intricate, high-quality designs. Made from natural materials like wool or silk, these rugs are known for their durability and luxurious feel. The process is labor-intensive, with higher knot density indicating finer detail and craftsmanship. Due to their durability, they can last for generations, making them a valuable investment. Hand-knotted rugs often feature traditional or modern patterns, adding elegance and character to any space.",
    products: [
      {
        id: 1,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 1',
      },
      {
        id: 2,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 2',
      },
      {
        id: 3,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 3',
      },
      {
        id: 4,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 4',
      },
      {
        id: 5,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 5',
      },
      {
        id: 6,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 6',
      },
      {
        id: 7,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 7',
      },
      {
        id: 8,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 8',
      },
      {
        id: 9,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 9',
      },
      {
        id: 10,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 10',
      },
      {
        id: 11,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 11',
      },
    ],
  },
  "rayess-collection": {
    title: "Rayees Collection",
    description: "The Rayees Collection is a distinguished line of handcrafted rugs, known for blending traditional artistry with contemporary elegance. Each piece in this collection is meticulously crafted, featuring intricate patterns and rich textures that reflect a deep appreciation for craftsmanship.",
    products: [
      { id: 1, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 1' },
      { id: 2, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 2' },
      { id: 3, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 3' },
      { id: 4, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 4' },
      { id: 5, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 5' },
    ],
  },
  "hand-knotted-oushak": {
    title: "Hand Knotted Oushak",
    description: "Oushak hand-knotted rugs are renowned for their timeless elegance and luxurious craftsmanship, originating from the Oushak region of Turkey. These rugs are meticulously hand-knotted, resulting in durable and long-lasting pieces.",
    products: [
      { id: 1, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 1' },
      { id: 2, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 2' },
      { id: 3, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 3' },
      { id: 4, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 4' },
      { id: 5, imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg', price: 'RS 1700 sq(Ft)', description: 'Description for Image 5' },
    ],
  },
   'Shop': {
    title: "Shop",
    description: "",
    products: [
      {
        id: 1,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 1',
      },
      {
        id: 2,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 2',
      },
      {
        id: 3,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 3',
      },
      {
        id: 4,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 4',
      },
      {
        id: 5,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 5',
      },
      {
        id: 6,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 6',
      },
      {
        id: 7,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 7',
      },
      {
        id: 8,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 8',
      },
      {
        id: 9,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 9',
      },
      {
        id: 10,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 10',
      },
      {
        id: 11,
        imgSrc: 'https://images2.naintrading.com/data/carpets/66-100783-155x105-01.jpg',
        price: 'RS 1500 sq(Ft)',
        description: 'Description for Image 11',
      },
    ],
  }, 
};

const CategoryPage = ({ categoryData }) => {
  const { title, description, products } = categoryData;

  return (
    <>
    <Nav/>
    <CustomizePage
      title={title}
      description={description}
      products={products}
    />
    <Footer/>
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { category } = params; // Get the category from URL parameters
  const data = categoryData[category] || categoryData['hand-knotted']; // Fallback

  return {
    props: {
      categoryData: data, // Pass the fetched data as props
    },
  };
}

export default CategoryPage;
