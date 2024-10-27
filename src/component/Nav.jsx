// src/components/Nav.jsx
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-lg flex  justify-between gap-10 text-sm text-black items-center py-1">
      {/* Left Side - Logo and Mobile Menu */}
      <div className="flex items-center">
        {/* Mobile Menu Icon and Search Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="p-2 focus:outline-none relative">
            {/* Icon change based on menu state */}
            <i className={`ri-menu-fill text-2xl transition-transform duration-300 ${menuOpen ? 'hidden' : 'block'}`}></i>
            <i className={`ri-close-fill text-2xl transition-transform duration-300 ${menuOpen ? 'block' : 'hidden'}`}></i>
          </button>
          <button onClick={toggleSearch} className="p-2 focus:outline-none ml-2">
            <i className="ri-search-line text-2xl"></i>
          </button>
        </div>
        
        {/* Logo */}
        <Image src="https://s3-alpha-sig.figma.com/img/c9a3/651f/090c30b7dec85d63787dbeeb98e5322d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gLWPMgr9kInHLYkRA37zJB7-yKtjoVH-JywCOxCMgeWKjif6w2Xh8Y5jdg6~z6DpdDNl6~aASIAv1KCNmO90ivTin4bIUapsfQedp2LEElFVNt~B1nMpDfk8QiiRPwlNIb8DYDR07idFREd4z3qS9GLxT4e4gd05FwKizZG3PcKv0iiQw~Q0VnGC9jKp2cYDrjPd7WWCGc9VpIrJaPGuD79cU73yFBf7sTs-1QsJi8OcCkhzKBApKBY1raBVuhkooUfsAW24OuR1JVez9oMTy-kxeO2~RKpAmBnKVuqsjDEP51GrjSgmR9ko4~5pS19JyJplYVadc9KjWs0mKDrQjg__" alt="" className='w-16 mx-20' width={200} height={200} />
        
      </div>

      {/* Center - Navigation Links (Desktop) */}
      <div className="flex-grow hidden md:flex justify-end pr-20 font-semibold items-center gap-8">
        <Link href="/" className="text-black hover:text-gray-500">Home</Link>
        <Link href="#" className="text-black hover:text-gray-500">Shop</Link>
        <Link href="/customize" className="text-black hover:text-gray-500">Customize</Link>
        <Link href="/contact_us" className="text-black hover:text-gray-500">Contact Us</Link>
        <Link href="/Blog" className="text-black hover:text-gray-500">Blog</Link>
      </div>

      {/* Search Input & Currency Dropdown (Desktop) */}
      <div className='hidden md:flex gap-5'>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full ring-1 ring-black py-1 px-3 pl-10 focus:outline-none"
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2"></i>
        </div>

        <select className="border border-gray-300 rounded-full ring-1 ring-black py-1 px-2 text-black">
          <option value="INR">₹ 🇮🇳</option>
          <option value="USD">$ 🇺🇸</option>
          {/* Add more currencies as needed */}
        </select>

        {/* Right Side - Icons */}
        
        <button className="text-black hover:text-gray-800">
          <i className="ri-heart-line text-2xl"></i>
        </button>
        <button className="text-black hover:text-gray-800">
          <i className="ri-shopping-bag-line text-2xl"></i>
        </button>
        <button className="text-black hover:text-gray-800">
          <i className="ri-user-line text-2xl"></i>
        </button>
        
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-50 md:hidden">
          <div className="flex flex-col items-center gap-4">
            <Link href="/" className="text-black hover:text-gray-800">Home</Link>
            <Link href="#" className="text-black hover:text-gray-800">Shop</Link>
            <Link href="/customize" className="text-black hover:text-gray-800">Customize</Link>
            <Link href="/contact_us" className="text-black hover:text-gray-800">Contact Us</Link>
            <Link href="/Blog" className="text-black hover:text-gray-800">Blog</Link>
            {/* Currency Dropdown */}
            <select className="border border-gray-300 rounded-full ring-1 ring-black py-1 px-2 text-black">
              <option value="INR">₹ 🇮🇳</option>
              <option value="USD">$ 🇺🇸</option>
              {/* Add more currencies as needed */}
            </select>
          </div>
        </div>
      )}

      {/* Search Input for Mobile */}
      {searchVisible && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white shadow-md p-4 z-50 md:hidden flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-full ring-1 ring-black py-1 px-3 pl-10 focus:outline-none"
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2"></i>
        </div>
      )}
      
      {/* Right Side - Icons for Mobile */}
      <div className="md:hidden flex items-center  gap-3 mr-4">
        <button className="text-black hover:text-gray-800">
          <i className="ri-heart-line text-2xl"></i>
        </button>
        <button className="text-black hover:text-gray-800">
          <i className="ri-shopping-bag-line text-2xl"></i>
        </button>
        <button className="text-black hover:text-gray-800">
          <i className="ri-user-line text-2xl"></i>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
