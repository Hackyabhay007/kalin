import React, { useEffect, useState } from 'react';
import { databases } from '@/appwrite'; // Ensure you have this import

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSizes, setTotalSizes] = useState(0);
  const [totalColors, setTotalColors] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalStock, setTotalStock] = useState(0); // State for total stock
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total products
        const productsResponse = await databases.listDocuments(
          '67269e330009154de759', // Database ID
          '67285c350037a7e0be53'  // Products Collection ID
        );
        setTotalProducts(productsResponse.total);

        // Calculate total stock from products
        const products = productsResponse.documents;
        const stockSum = products.reduce((acc, product) => acc + (product.stock || 0), 0); // Sum stock of each product
        setTotalStock(stockSum); // Set the total stock

        // Fetch total sizes
        const sizesResponse = await databases.listDocuments(
          '67269e330009154de759', // Database ID
          '672894d500200dd978d1'  // Sizes Collection ID
        );
        setTotalSizes(sizesResponse.total);

        // Fetch total colors
        const colorsResponse = await databases.listDocuments(
          '67269e330009154de759', // Database ID
          '672888fb001f6df04958'  // Colors Collection ID
        );
        setTotalColors(colorsResponse.total);

        // Fetch total categories
        const categoriesResponse = await databases.listDocuments(
          '67269e330009154de759', // Database ID
          '67287391003a9b859371'  // Categories Collection ID
        );
        setTotalCategories(categoriesResponse.total);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sample data for the dashboard
  const dashboardData = {
    totalOrders: 0, // Set this to the actual total orders count when available
    totalStock: totalStock, // Use calculated total stock
    totalSizes: totalSizes,
    totalColorTypes: totalColors,
    totalCategories: totalCategories,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-black rounded-sm p-4 shadow">
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-2xl">{dashboardData.totalOrders}</p>
        </div>
        <div className="bg-white border border-black rounded-sm p-4 shadow">
          <h2 className="text-xl font-bold">Total Products</h2>
          <p className="text-2xl">{totalProducts}</p>
        </div>
        <div className="bg-white border border-black rounded-sm p-4 shadow">
          <h2 className="text-xl font-bold">Total Stock</h2>
          <p className="text-2xl">{dashboardData.totalStock}</p>
        </div>
        <div className="bg-white border border-black rounded-sm p-4 shadow">
          <h2 className="text-xl font-bold">Total Sizes</h2>
          <p className="text-2xl">{dashboardData.totalSizes}</p>
        </div>
        <div className="bg-white border border-black rounded-sm p-4 shadow">
          <h2 className="text-xl font-bold">Color Types</h2>
          <p className="text-2xl">{dashboardData.totalColorTypes}</p>
        </div>
        <div className="bg-white border border-black rounded-sm p-4 shadow">
          <h2 className="text-xl font-bold">Total Categories</h2>
          <p className="text-2xl">{dashboardData.totalCategories}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
