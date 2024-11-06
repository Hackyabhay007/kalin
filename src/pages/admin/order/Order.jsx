import React, { useState, useEffect } from 'react';
import { databases } from '@/appwrite'; // Ensure you have Appwrite initialized

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from Appwrite on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await databases.listDocuments(
          '67269e330009154de759', // Database ID
          '6729a823001e6fb8f448'  // Orders Collection ID
        );
        const fetchedOrders = response.documents.map(order => ({
          id: order.$id,
          productName: order.name,
          price: order.price,
          quantity: order.quantity,
          address: order.address,
          status: order.status || 'Pending' // Default status to 'Pending' if not provided
        }));
        setOrders(fetchedOrders);
      } catch (err) {
        setError('Error fetching orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to update the status of an order
  const updateStatus = async (id, newStatus) => {
    try {
      await databases.updateDocument(
        '67269e330009154de759', // Database ID
        '6729a823001e6fb8f448', // Orders Collection ID
        id,
        { status: newStatus }
      );
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
            <th className="border border-black p-2">Address</th>
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
              <td className="border border-black p-2">{order.address}</td>
              <td className="border border-black p-2">{order.status}</td>
              <td className="border border-black p-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Order;
