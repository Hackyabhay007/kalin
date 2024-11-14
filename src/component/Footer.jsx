"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Client, Databases } from "appwrite";
import Image from "next/image";

function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const databases = new Databases(client);

  const handleEmailSubmit = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_SUBSCRIPTION_COLLECTION_ID,
        "unique()",
        { email }
      );
      setIsSuccess(true);
      setEmail("");
      setError("");
    } catch (err) {
      setError("Failed to add email. Please try again.");
      console.error("Error adding email", err);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setIsSuccess(false);
  };

  return (
    <footer className="bg-black text-white py-10 font-thin relative">
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center  items-center z-50">
          <div className="bg-white p-6 border-2 border-black text-center h-auto w-fit mx-auto">
            <h3 className="text-black text-2xl font-semibold mb-5">Thank You!</h3>
            <i class="ri-mail-ai-line text-gray-900  text-5xl font-thin"></i>
            <p className="text-gray-800 font-thin my-5 ">
              You will get perks and exclusive first access to our newest collections and sales.
            </p>
            <button
              onClick={closePopup}
              className="mt-4 px-6 py-2 hover:text-black text-white bg-black hover:bg-white border-2 border-black"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Desktop and Tablet View */}
      <div className="hidden md:grid grid-cols-4 gap-10 px-10">
        {/* Column 1: Logo and Sign Up */}
        <div className="space-y-4">
          <Image
            className="w-14 rounded-full"
            src="/local/images/logo.png"
            alt="Logo"
            width={56}
            height={56}
          />
          <p>Sign up for perks, and exclusive first access to newest collections and sales.</p>
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-full border-2 px-4 py-2 w-full bg-black text-white"
            />
            <button
              className="bg-white text-black px-6 py-2 rounded-full -ml-12"
              onClick={handleEmailSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Enter"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Other columns */}
        <div className="space-y-2 pl-40">
          <h3 className="font-semibold text-xl">About</h3>
          <ul className="space-y-2">
            <Link href="/contact_us"><li>Contact us</li></Link>
            <Link href="/policies/company-info"><li>Company Info</li></Link>
            <Link href="/Blog"><li>Blog</li></Link>
            <Link href="/Story"><li>Our Story</li></Link>
          </ul>
        </div>

        <div className="space-y-2 pl-20">
          <h3 className="font-semibold text-xl">Shopping With Us</h3>
          <ul className="space-y-2">
            <Link href="/track_order"><li>Track Your Order</li></Link>
            <Link href="/policies/shipping-policy"><li>Shipping</li></Link>
            <Link href="/policies/return-policy"><li>Return/Exchange</li></Link>
            <Link href="/policies/terms-and-conditions"><li>Terms & Conditions</li></Link>
            <Link href="/shop"><li>Shop Carpets</li></Link>
            <Link href="/policies/privacy-policy"><li>Privacy Policy</li></Link>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-xl">Follow</h3>
          <div className="flex space-x-5">
            <a href="#" className="text-black">
              <i className="ri-instagram-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
            <a href="#" className="text-black">
              <i className="ri-youtube-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
            <a href="#" className="text-black">
              <i className="ri-facebook-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col divide-y divide-white space-y-10 px-4">
        {/* Column 1: Logo and Sign Up */}
        <div className="space-y-4 py-4">
          <Image
            className="w-14 rounded-full"
            src="/local/images/logo.png"
            alt="Logo"
            width={56}
            height={56}
          />
          <p>Sign up for perks, and exclusive first access to newest collections and sales.</p>
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="rounded-full border-2 px-4 py-2 w-full bg-black text-white"
            />
            <button
              className="bg-white text-black px-6 py-2 rounded-full -ml-12"
              onClick={handleEmailSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Enter"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Mobile Columns */}
        <div className="space-y-4 py-4">
          <h3 className="font-semibold text-xl">About</h3>
          <ul className="space-y-2">
            <Link href="/contact_us"><li>Contact us</li></Link>
            <Link href="/policies/company-info"><li>Company Info</li></Link>
            <Link href="/Blog"><li>Blog</li></Link>
            <Link href="/Story"><li>Our Story</li></Link>
          </ul>
        </div>

        <div className="space-y-4 py-4">
          <h3 className="font-semibold text-xl">Shopping With Us</h3>
          <ul className="space-y-2">
            <Link href="/track_order"><li>Track Your Order</li></Link>
            <Link href="/policies/shipping-policy"><li>Shipping</li></Link>
            <Link href="/policies/return-policy"><li>Return/Exchange</li></Link>
            <Link href="/policies/terms-and-conditions"><li>Terms & Conditions</li></Link>
            <Link href="/shop"><li>Shop Carpets</li></Link>
            <Link href="/policies/privacy-policy"><li>Privacy Policy</li></Link>
          </ul>
        </div>

        <div className="space-y-4 py-4">
          <h3 className="font-semibold text-xl">Follow</h3>
          <div className="flex space-x-5">
            <a href="#" className="text-black">
              <i className="ri-instagram-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
            <a href="#" className="text-black">
              <i className="ri-youtube-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
            <a href="#" className="text-black">
              <i className="ri-facebook-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
