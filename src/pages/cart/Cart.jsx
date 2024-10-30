import Link from 'next/link';
import React from 'react';

function Cart({ cartItems = [] }) {
  return (
    <div className="bg-white px-4 py-8 min-h-96">
      <h2 className="text-2xl  text-center font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-8">Your cart is empty</p>
         <Link href="/customize/Shop"><button className="bg-black text-white px-4 py-2 rounded border hover:bg-white hover:border-black hover:text-black">Back to Shopping</button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cartItems.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 text-center">
              <img src={item.image} alt={item.name} className="h-28 w-full object-cover mb-2" />
              <h3 className="text-sm mb-1">{item.name}</h3>
              <p className="text-sm text-gray-700">1700 Sq(Ft)</p>
              <button className="bg-black text-white mt-2 px-4 py-2">Buy Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
