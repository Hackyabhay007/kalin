"use client";
import Link from "next/link";
import React from "react";
function Footer() {
  return (
    <footer className="bg-black text-white py-10 font-thin">
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-4 gap-10 px-10">
        {/* Column 1: Logo and Sign Up */}
        <div className="space-y-4">
          <img
            className="w-14 rounded-full"
            src="https://s3-alpha-sig.figma.com/img/c9a3/651f/090c30b7dec85d63787dbeeb98e5322d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gLWPMgr9kInHLYkRA37zJB7-yKtjoVH-JywCOxCMgeWKjif6w2Xh8Y5jdg6~z6DpdDNl6~aASIAv1KCNmO90ivTin4bIUapsfQedp2LEElFVNt~B1nMpDfk8QiiRPwlNIb8DYDR07idFREd4z3qS9GLxT4e4gd05FwKizZG3PcKv0iiQw~Q0VnGC9jKp2cYDrjPd7WWCGc9VpIrJaPGuD79cU73yFBf7sTs-1QsJi8OcCkhzKBApKBY1raBVuhkooUfsAW24OuR1JVez9oMTy-kxeO2~RKpAmBnKVuqsjDEP51GrjSgmR9ko4~5pS19JyJplYVadc9KjWs0mKDrQjg__"
            alt=""
          />
          <p>
            Sign up for perks, and exclusive first access to newest collections
            and sales.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-full border-2 px-4 py-2 w-full bg-black text-white"
            />
            <button className="bg-white text-black px-6 py-2 rounded-full -ml-12">
              Enter
            </button>
          </div>
        </div>

        {/* Column 2: About Section */}
        <div className="space-y-2 pl-40">
          <h3 className="font-semibold text-xl">About</h3>
          <ul className="space-y-2">
            <Link href="/contact_us">
              <li>Contact us</li>
            </Link>
            <Link href="/policies/company-info">
              <li>Company Info</li>
            </Link>
            <Link href="/Blog">
              <li>Blog</li>
            </Link>
            {/* <Link href="/#"><li>Craftsmanship</li></Link> */}
            <Link href="/Story">
              <li>Our Story</li>
            </Link>
          </ul>
        </div>

        {/* Column 3: Shopping with Us */}
        <div className="space-y-2 pl-20">
          <h3 className="font-semibold text-xl">Shopping With Us</h3>
          <ul className="space-y-2">
            <Link href="/track_order">
              <li>Track Your Order</li>
            </Link>
            <Link href="/policies/shipping-policy">
              <li>Shipping</li>
            </Link>
            <Link href="/policies/return-policy">
              <li>Return/Exchange</li>
            </Link>
            <Link href="/policies/terms-and-conditions">
              <li>Terms & Conditions</li>
            </Link>
            <Link href="/customize/Shop">
              <li>Shop Carpets</li>
            </Link>
            <Link href="/policies/privacy-policy">
              <li>Privacy Policy</li>
            </Link>
          </ul>
        </div>

        {/* Column 4: Social Media Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-xl">Follow</h3>
          <div className="flex space-x-5">
            <a href="#" className="  text-black ">
              <i className="ri-instagram-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
            <a href="#" className="  text-black ">
              <i className="ri-youtube-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
            <a href="#" className="  text-black ">
              <i className="ri-facebook-line bg-white p-1 rounded-full border-2 text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col space-y-10 px-4">
        {/* Column 1: Logo and Sign Up */}
        <div className="space-y-4">
          <img
            className="w-14 rounded-full"
            src="https://s3-alpha-sig.figma.com/img/c9a3/651f/090c30b7dec85d63787dbeeb98e5322d?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gLWPMgr9kInHLYkRA37zJB7-yKtjoVH-JywCOxCMgeWKjif6w2Xh8Y5jdg6~z6DpdDNl6~aASIAv1KCNmO90ivTin4bIUapsfQedp2LEElFVNt~B1nMpDfk8QiiRPwlNIb8DYDR07idFREd4z3qS9GLxT4e4gd05FwKizZG3PcKv0iiQw~Q0VnGC9jKp2cYDrjPd7WWCGc9VpIrJaPGuD79cU73yFBf7sTs-1QsJi8OcCkhzKBApKBY1raBVuhkooUfsAW24OuR1JVez9oMTy-kxeO2~RKpAmBnKVuqsjDEP51GrjSgmR9ko4~5pS19JyJplYVadc9KjWs0mKDrQjg__"
            alt=""
          />
          <p>
            Sign up for perks, and exclusive first access to newest collections
            and sales.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-full  border-2 border-white  px-4 py-2 w-3/5 bg-black text-white"
            />
            <button className="bg-white text-black px-6 py-2 rounded-full -ml-12 z-10">
              Enter
            </button>
          </div>
        </div>

        <hr className="border-white" />

        {/* Column 2: About Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-xl">About</h3>
          <ul className="space-y-2">
          <Link href="/contact_us">
              <li>Contact us</li>
            </Link>
            <Link href="/policies/company-info">
              <li>Company Info</li>
            </Link>
            <Link href="/Blog">
              <li>Blog</li>
            </Link>
            {/* <Link href="/#"><li>Craftsmanship</li></Link> */}
            <Link href="/Story">
              <li>Our Story</li>
            </Link>
          </ul>
        </div>

        <hr className="border-white" />

        {/* Column 3: Shopping with Us */}
        <div className="space-y-4">
          <h3 className="font-semibold text-xl">Shopping With Us</h3>
          <ul className="space-y-2">
          <Link href="/track_order">
              <li>Track Your Order</li>
            </Link>
            <Link href="/policies/shipping-policy">
              <li>Shipping</li>
            </Link>
            <Link href="/policies/return-policy">
              <li>Return/Exchange</li>
            </Link>
            <Link href="/policies/terms-and-conditions">
              <li>Terms & Conditions</li>
            </Link>
            <Link href="/customize/Shop">
              <li>Shop Carpets</li>
            </Link>
            <Link href="/policies/privacy-policy">
              <li>Privacy Policy</li>
            </Link>
          </ul>
        </div>

        <hr className="border-white" />

        {/* Column 4: Social Media Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-xl">Follow</h3>
          <div className="flex space-x-5">
            <a href="#" className="text-black">
              <i className="ri-instagram-line bg-white p-2 rounded-full text-xl"></i>
            </a>
            <a href="#" className="text-black">
              <i className="ri-youtube-line bg-white p-2 rounded-full text-xl"></i>
            </a>
            <a href="#" className="text-black">
              <i className="ri-facebook-line bg-white p-2 rounded-full text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
