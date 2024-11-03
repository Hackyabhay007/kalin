import React from 'react';

function Dashboard() {
  // Sample data for the dashboard (You can replace these with actual data from your database or API)
  const dashboardData = {
    totalOrders: 120,
    totalProducts: 75,
    totalStock: 300,
    totalSizes: 10,
    totalColorTypes: 5,
    totalCategories: 8,
  };

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
          <p className="text-2xl">{dashboardData.totalProducts}</p>
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
