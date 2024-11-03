import React, { useState } from 'react';

function Order() {
  // Sample data for demonstration
  const [orders, setOrders] = useState([
    { id: 1, productName: 'Product A', price: 200, quantity: 2, status: 'Processing' },
    { id: 2, productName: 'Product B', price: 150, quantity: 1, status: 'Processing' },
    { id: 3, productName: 'Product C', price: 300, quantity: 3, status: 'Processing' },
  ]);

  // Function to update the status of an order
  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="p-4 bg-white border border-black rounded-sm">
      <h1 className="text-xl mb-4">Manage Orders</h1>

      <table className="min-w-full border-collapse border border-black">
        <thead>
          <tr>
            <th className="border border-black p-2">Order ID</th>
            <th className="border border-black p-2">Product Name</th>
            <th className="border border-black p-2">Price</th>
            <th className="border border-black p-2">Quantity</th>
            <th className="border border-black p-2">Status</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border border-black p-2">{order.id}</td>
              <td className="border border-black p-2">{order.productName}</td>
              <td className="border border-black p-2">{order.price} Rs</td>
              <td className="border border-black p-2">{order.quantity}</td>
              <td className="border border-black p-2">{order.status}</td>
              <td className="border border-black p-2">
                <button 
                  onClick={() => updateStatus(order.id, 'Complete')}
                  className="bg-green-500 text-white px-2 py-1 rounded-sm mr-2"
                >
                  Complete
                </button>
                <button 
                  onClick={() => updateStatus(order.id, 'Cancelled')}
                  className="bg-red-500 text-white px-2 py-1 rounded-sm mr-2"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => updateStatus(order.id, 'Shipping')}
                  className="bg-blue-500 text-white px-2 py-1 rounded-sm"
                >
                  Shipping
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
