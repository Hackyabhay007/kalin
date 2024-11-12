import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter hook
import { databases } from '@/appwrite';

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function Categories() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();  // Initialize useRouter hook

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CATEGORIES_ID
        );
        const formattedCategories = response.documents.map((category) => ({
          name: category.category, // Assuming 'category' is the field name in the collection
          image: category.image,
          slug: generateSlug(category.category), // Generate slug dynamically
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    // Update the URL with the selected category in the query string
    router.push(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="py-10 px-3">
      <h2 className="text-center text-xl font-semibold mb-5">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-screen-xl">
        {categories.map((category) => (
          <div key={category.slug} className="flex flex-col items-center">
            <div onClick={() => handleCategoryClick(category.name)} className="cursor-pointer">
              <Image
                src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${category.image}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`}
                alt={category.name}
                width={250} // Set the width of the image
                height={500} // Set the height of the image
                className="h-80 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/path/to/placeholder-image.jpg';
                }}
              />
            </div>
            <span className="mt-2 text-center font-semibold">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
