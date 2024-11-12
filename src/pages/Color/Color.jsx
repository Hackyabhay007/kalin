import React, { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter for URL manipulation

function Color() {
  const [colors, setColors] = useState([]);
  const router = useRouter(); // Initialize the useRouter hook

  // Initialize the Appwrite client
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  useEffect(() => {
    // Fetch color data from Appwrite
    const fetchColors = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_COLORS_ID
        );

        // Map response data to include full image URLs
        const colorData = response.documents.map(color => ({
          ...color,
          imageUrl: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${color.image}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`
        }));

        setColors(colorData);
      } catch (error) {
        console.error("Failed to fetch color data:", error);
      }
    };

    fetchColors();
  }, []);

  const handleColorClick = (colorName) => {
    // Update the URL with the selected color in the query string
    router.push(`/shop?color=${encodeURIComponent(colorName)}`);
  };

  return (
    <div className="py-10">
      <h2 className="text-center text-xl font-semibold mb-10">Select by Colors</h2>
      <div className="grid grid-cols-3 md:gap-10 gap-11 mx-10 md:mx-20 max-w-screen-xl">
        {colors.map((color, index) => (
          <div key={index} className="flex justify-center">
            <div 
              onClick={() => handleColorClick(color.name)} // Handle color click
              className="cursor-pointer"
            >
              <Image
                src={color.imageUrl}
                alt={`Color ${index + 1}`}
                width={160} // Set appropriate width
                height={160} // Set appropriate height
                className="object-cover rounded-md"
                placeholder="blur"
                blurDataURL="/placeholder-image-url.jpg" // Optional placeholder
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Color;
