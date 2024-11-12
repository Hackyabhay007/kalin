import React from 'react';
import Link from 'next/link';

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white shadow-md">
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/admin/dashboard">
              <p className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/hero">
              <p className="block py-2 px-4 hover:bg-gray-700 rounded">hero</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/products">
              <p className="block py-2 px-4 hover:bg-gray-700 rounded">Products</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/order">
              <p className="block py-2 px-4 hover:bg-gray-700 rounded">Orders</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/categories">
              <p className="block py-2 px-4 hover:bg-gray-700 rounded">Categories</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/color">
              <p className="block py-2 px-4 hover:bg-gray-700 rounded">Colors</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/size">
              <p className="block py-2 px-4 hover:bg-gray-700 rounded">Sizes</p>
            </Link>
          </li>
          <li>
            <Link href="/admin/blog">
              <p className="block py-2 px-4 hover:bg-gray-700 rounded">Blog</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
