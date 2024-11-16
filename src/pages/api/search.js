import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Ensure this is set correctly
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Ensure the project ID is correct

const databases = new Databases(client);

export default async function handler(req, res) {
  const { query } = req.query;  // Get 'query' parameter from the URL

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Fetch categories, products, and colors based on search query
    const categoryResults = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID,
      { search: query }
    );

    const productResults = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID,
      { search: query }
    );

    const colorResults = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLORS_COLLECTION_ID,
      { search: query }
    );

    // Combine all results (categories, products, colors) into a single suggestions array
    const suggestions = [
      ...categoryResults.documents.map((doc) => `Category: ${doc.category}`),
      ...productResults.documents.map((doc) => `Product: ${doc.$id}`),
      ...colorResults.documents.map((doc) => `Color: ${doc.name}`),
    ];
    res.status(200).json(suggestions);  // Return the suggestions as JSON
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
