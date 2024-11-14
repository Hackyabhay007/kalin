"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCurrency } from "@/redux/slices/currencySlice";
import { fetchOrUpdateConversionRate } from "@/utils/currencyUtils";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import { debounce } from "lodash";

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const isLoggedIn = Boolean(userEmail);
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = localStorage.getItem("user");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const selectedCurrency = useSelector((state) => state.currency.selectedCurrency);

  const handleCurrencyChange = async (e) => {
    const newCurrency = e.target.value;
    dispatch(setSelectedCurrency(newCurrency));
    await fetchOrUpdateConversionRate(dispatch, "INR", newCurrency); // assuming INR as base
  };

  const fetchSuggestions = debounce(async (query) => {
    if (query.trim()) {
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch suggestions");
  
        const data = await res.json();
        setSuggestions(data); // Set suggestions from API response
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);
  

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query); // Fetch suggestions with debounce
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery("");
    setSuggestions([]);
    router.push({
      pathname: "/shop",
      query: { category: suggestion },
    });
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push({
        pathname: "/shop",
        query: { category: searchQuery }, // Redirect to the shop page with search query
      });
      setSuggestions([]); // Clear suggestions after search
    }
  };

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
          <button
            onClick={toggleMenu}
            className="p-2 focus:outline-none relative"
          >
            {/* Icon change based on menu state */}
            <i
              className={`ri-menu-fill text-2xl transition-transform duration-300 ${
                menuOpen ? "hidden" : "block"
              }`}
            ></i>
            <i
              className={`ri-close-fill text-2xl transition-transform duration-300 ${
                menuOpen ? "block" : "hidden"
              }`}
            ></i>
          </button>
          <button
            onClick={toggleSearch}
            className="p-2 focus:outline-none ml-2"
          >
            <i className="ri-search-line text-2xl"></i>
          </button>
        </div>

        {/* Logo */}
        <Image
          src="/local/images/logo.png"
          alt=""
          className="w-16 mx-20"
          width={200}
          height={200}
        />
      </div>

      {/* Center - Navigation Links (Desktop) */}
      <div className="flex-grow hidden md:flex justify-end pr-20  items-center gap-8">
        <Link href="/" className="text-black hover:text-gray-500">
          Home
        </Link>
        <Link href="/shop" className="text-black hover:text-gray-500">
          Shop
        </Link>
        <Link href="/customize" className="text-black hover:text-gray-500">
          Customize
        </Link>
        <Link href="/contact_us" className="text-black hover:text-gray-500">
          Contact Us
        </Link>
        <Link href="/Blog" className="text-black hover:text-gray-500">
          Blog
        </Link>
      </div>

      {/* Search Input & Currency Dropdown (Desktop) */}
      <div className="hidden md:flex gap-5">
      <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchEnter} // Detect Enter key
            className="border border-gray-300 rounded-full ring-1 ring-black py-1 px-3 pl-10 focus:outline-none"
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2"></i>

          {searchQuery && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="border border-gray-300 rounded-full ring-1 ring-black py-1 px-2 text-black"
        >
          <option value="INR">₹ 🇮🇳</option>
          <option value="USD">$ 🇺🇸</option>
          {/* Add more currencies as needed */}
        </select>

        {/* Right Side - Icons */}

        
        <Link href="/cart">
          <button className="text-black hover:text-gray-800">
            <i className="ri-shopping-bag-line text-2xl"></i>
            {cartItemCount > 0 && (
            <span className="absolute top-5 right-9 bg-white border-2 border-black  text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          </button>
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <i className="ri-user-line text-2xl"></i>
            <span>{userEmail}</span>
            <Link href="/user/dashboard">
              <button className="text-black hover:text-gray-800">
                Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <Link href="/auth">
            <button className="text-black hover:text-gray-800">
              <i className="ri-user-line text-2xl"></i>
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-50 md:hidden">
          <div className="flex flex-col items-center gap-4">
            <Link href="/" className="text-black hover:text-gray-800">
              Home
            </Link>
            <Link
              href="/Shop"
              className="text-black hover:text-gray-800"
            >
              Shop
            </Link>
            <Link href="/customize" className="text-black hover:text-gray-800">
              Customize
            </Link>
            <Link href="/contact_us" className="text-black hover:text-gray-800">
              Contact Us
            </Link>
            <Link href="/Blog" className="text-black hover:text-gray-800">
              Blog
            </Link>
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
        <div className="absolute top-16 left-1/2 w-screen transform -translate-x-1/2 bg-white shadow-md p-4 z-50 md:hidden flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchEnter}
            className="border border-gray-300 w-screen rounded-full ring-1 ring-black py-1 px-3 pl-10 focus:outline-none"
          />
          <i className="ri-search-line absolute left-6 top-1/2   transform -translate-y-1/2"></i>
          
          {searchQuery && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Right Side - Icons for Mobile */}
      <div className="md:hidden flex items-center  gap-3 mr-4">
       
        <Link href="/cart">
          <button className="text-black hover:text-gray-800">
            <i className="ri-shopping-bag-line text-2xl"></i>
          </button>
        </Link>
        <Link href="/login">
          <button className="text-black hover:text-gray-800">
            <i className="ri-user-line text-2xl"></i>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
