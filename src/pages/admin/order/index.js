import React from 'react';
import AdminLayout from '../layout'; // Import the AdminLayout with sidebar
import Order from './Order'; // Import the Order component

const OrdersPage = () => {
  return (
    <AdminLayout>
      <Order />
    </AdminLayout>
  );
};

export default OrdersPage;
