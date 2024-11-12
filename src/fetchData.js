// src/fetchData.js
import { databases } from './appwrite';

export async function fetchCategoryData(collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS_ID) {
  try {
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // Use the database ID from the environment variable
      collectionId
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      // Construct the image URL using the mainImage ID from Appwrite
      imgSrc: doc.mainImage 
        ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/6728694d000af27c9294/files/${doc.mainImage}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}&mode=admin`
        : '/images/default.jpg', // Fallback to a default image if none is provided
      name: doc.name,   // Product name
      price: doc.price, // Product price
      sizes: Array.isArray(doc.sizes) 
      ? doc.sizes
      : doc.sizes && typeof doc.sizes === 'string'
        ? doc.sizes.split(',').map(size => size.trim())  // Split string into array if it's a comma-separated string
        : [],  // Return an empty array if sizes is neither an array nor a valid string
      category: doc.category, // Category for filtering
      color: doc.colors, // Color for filtering
    }));
  } catch (error) {
    console.error('Error fetching category data:', error);
    return [];
  }
}
