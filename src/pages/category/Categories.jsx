// src/components/Categories.jsx
import React from 'react';
import Link from 'next/link'; // Import Link from next/link

function Categories() {
  // Sample category data
  const categories = [
    {
      name: 'Hand knotted carpet',
      image: 'https://images.jaipurrugs.com/prod-images/Headshot/Large/RCT_PAEM-383-0001.jpg',
      slug: 'hand-knotted', // Add a slug for routing
    },
    {
      name: 'Hand tufted',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLehH2k9NhDaLeynRfa2PjVkaJzDZa5KhtqA&s',
      slug: 'hand-tufted', // Add a slug for routing
    },
    {
      name: 'Oushak hand knotted',
      image: 'https://i.pinimg.com/736x/fc/65/84/fc6584d0a1364d7f7618767a96282979.jpg',
      slug: 'hand-knotted-oushak', // Add a slug for routing
    },
    {
      name: 'Persian hand knotted',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkvg6qEw9h3JegDFMgzT69s7I60tja0FVZnsiPLlObBtTJHdwBxsAnGlUfifWkXknVSU&usqp=CAU',
      slug: 'persian-hand-knotted', // Add a slug for routing
    },
    {
      name: 'Rayess collection',
      image: 'https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=85&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FhFG4A_6aZef3oQXaxA4vNA%2Fnormalized.jpg&width=652',
      slug: 'rayess-collection', // Add a slug for routing
    },
    {
      name: 'Shamim collection',
      image: 'https://afshouncarpet.com/en/wp-content/uploads/2023/12/sahmim-filii.jpg',
      slug: 'shamim-collection', // Add a slug for routing
    },
  ];

  return (
    <div className="py-10 px-3">
      <h2 className="text-center text-xl font-semibold mb-5">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-screen-xl">
        {categories.map((category) => (
          <div key={category.slug} className="flex flex-col items-center">
            <Link href={`/customize/${category.slug}`}> {/* Use Link for navigation */}
              <img 
                src={category.image} 
                alt={category.name} 
                className="h-80 object-cover cursor-pointer" 
                onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/placeholder-image.jpg'; }} 
              />
            </Link>
            <span className="mt-2 text-center font-semibold">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
