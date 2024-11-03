import React from 'react';
import Sidebar from '@/component/Sidebar';

function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
