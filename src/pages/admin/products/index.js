import React from 'react';
import Product from './Product'; // Import the Product component
import AdminLayout from '../layout';

const ProductsPage = () => {
  return (
    <AdminLayout>
      <Product />
    </AdminLayout>
  );
};

export default ProductsPage;
