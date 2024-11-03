import React from 'react';
import AdminLayout from '../layout'; // Import the AdminLayout with sidebar
import Color from './Color'; // Import the Color component

const ColorPage = () => {
  return (
    <AdminLayout>
      <Color />
    </AdminLayout>
  );
};

export default ColorPage;
