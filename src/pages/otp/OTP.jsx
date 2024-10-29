import React from 'react';

function OTP() {
  return (
    <div className="flex justify-center items-center min-h-fit bg-white px-5 py-10">
      <div className="w-full max-w-sm bg-white text-center">
        {/* Heading */}
        <h1 className="text-2xl font-semibold mb-4">Enter OTP</h1>
        
        {/* Subheading */}
        <p className="text-gray-700 mb-2">The OTP is sent on your mobile phone</p>
        
        {/* Phone number and edit icon */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          <span className="font-medium">+91-0000000000</span>
          <i className="ri-edit-box-line cursor-pointer"></i>
        </div>
        
        {/* OTP Input Boxes */}
        <div className="flex justify-center space-x-4 mb-8">
          <input type="text" maxLength="1" className="w-12 h-12 text-center text-black border border-gray-900 rounded-sm focus:outline-none" />
          <input type="text" maxLength="1" className="w-12 h-12 text-center text-black border border-gray-900 rounded-sm focus:outline-none" />
          <input type="text" maxLength="1" className="w-12 h-12 text-center text-black border border-gray-900 rounded-sm focus:outline-none" />
          <input type="text" maxLength="1" className="w-12 h-12 text-center text-black border border-gray-900 rounded-sm focus:outline-none" />
        </div>
        
        {/* Verify OTP Button */}
        <button className="w-full py-3 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-colors mb-6">
          Verify OTP
        </button>
        
        {/* Resend Option */}
        <p className="text-gray-400 text-sm mb-2">
          Didn&apos;t receive OTP? <span className="text-blue-500 cursor-pointer"> Resend OTP</span>
        </p>
      </div>
    </div>
  );
}

export default OTP;
