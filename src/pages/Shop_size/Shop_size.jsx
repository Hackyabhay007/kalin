import React, { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';
import { useRouter } from 'next/router';

function Shop_size() {
  const [cards, setCards] = useState([]);
  const router = useRouter();

  // Initialize the Appwrite client
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  // Function to generate a random light color
  const generateRandomLightColor = () => {
    const r = Math.floor(Math.random() * 100 + 100);
    const g = Math.floor(Math.random() * 100 + 100);
    const b = Math.floor(Math.random() * 100 + 100);
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    // Fetch sizes and products from Appwrite
    const fetchSizesAndProducts = async () => {
      try {
        // Fetch sizes from Appwrite
        const sizeResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SIZES_ID
        );

        // Fetch products from Appwrite
        const productResponse = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS_ID
        );

        // Filter products based on size matching and limit to unique sizes
        const matchedCards = sizeResponse.documents.map((size) => {
          const sizeString = `${size.width}x${size.height}`;
          const matchingProduct = productResponse.documents.find((product) =>
            product.sizes.includes(sizeString)
          );

          if (matchingProduct) {
            const imageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${matchingProduct.mainImage}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`;
            return {
              id: matchingProduct.$id,
              size: `${size.width} x ${size.height}`,
              image: imageUrl,
              color: generateRandomLightColor(), // Assign a random light color
            };
          }
          return null;
        }).filter(Boolean);

        setCards(matchedCards.slice(0, sizeResponse.documents.length)); // Limit to available unique sizes
      } catch (error) {
        console.error("Failed to fetch sizes or products:", error);
      }
    };

    fetchSizesAndProducts();
  }, []);

  // Handle navigation to /shop with size query parameter
  const handleShopNowClick = (size) => {
    const formattedSize = size.replace(/\s+/g, '');
    router.push(`/shop?size=${formattedSize}`);
  };

  return (
    <div className="text-center">
      <h1 className="text-lg font-semibold">Shop by ₹ 1700 Sqft</h1>
      <div className="flex flex-wrap justify-center gap-6 px-4 py-10">
        {cards.map((card) => (
          <div
            key={card.id}
            style={{ backgroundColor: card.color }} // Apply the random color
            className="w-[250px] rounded-md flex flex-col justify-between items-center pb-6 px-5"
          >
            <img
              src={card.image}
              alt={card.size}
              className="w-full h-48 object-cover rounded-b-full"
            />
            <h3 className="text-white mt-2">{card.size}</h3>
            <button
              className="bg-white text-black py-2 px-5 rounded-lg mt-2"
              onClick={() => handleShopNowClick(card.size)}
            >
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop_size;
