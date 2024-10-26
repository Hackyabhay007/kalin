// src/components/Color.jsx
import React from 'react';

function Color() {
  // Sample color data with image URLs
  const colors = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ94c2XCEpAaAgoYkZYiwXwNuNdqAvO3DsobA&s', // Replace with your color images
    },
    {
      image: 'https://www.thewoolcompany.co.nz/content/products/4ply-soft-pink-merino-yarn-soft-pink-web-image-4134.jpg?fit=crop&canvas=1:1&width=64',
    },
    {
      image: 'https://5.imimg.com/data5/SELLER/Default/2023/3/295729273/NA/NS/RH/58000670/silk-wool-250x250.png',
    },
    {
      image: 'https://m.media-amazon.com/images/I/71RnGRbbcjL.jpg',
    },
    {
      image: 'https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-beautiful-green-yarn-png-image_11508630.png',
    },
    {
      image: 'https://www.kanvascape.co.nz/cdn/shop/files/BrightRed.png?v=1697531553',
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-center text-xl font-semibold mb-10">Select by Colors</h2>
      <div className="grid grid-cols-3 md:gap-10 gap-11 mx-10  md:mx-20 max-w-screen-xl">
        {colors.map((color, index) => (
          <div key={index} className="flex justify-center">
            <img src={color.image} alt={`Color ${index + 1}`} className="w-40" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Color;
