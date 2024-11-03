import React, { useState } from 'react';
// import { account } from '../appwrite';
import { account } from '@/appwrite';

function OTP() {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const verifyOTP = async () => {
    try {
      const otpCode = otp.join('');
      await account.updatePhoneSession('YOUR_PHONE_SESSION_ID', otpCode);
      alert('Login successful!');
    } catch (error) {
      console.error('Invalid OTP:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-fit bg-white px-5 py-10">
      <div className="w-full max-w-sm bg-white text-center">
        <h1 className="text-2xl font-semibold mb-4">Enter OTP</h1>
        <p className="text-gray-700 mb-2">The OTP is sent on your mobile phone</p>

        <div className="flex justify-center space-x-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-black border border-gray-900 rounded-sm focus:outline-none"
            />
          ))}
        </div>
        
        <button
          onClick={verifyOTP}
          className="w-full py-3 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-colors mb-6"
        >
          Verify OTP
        </button>

        <p className="text-gray-400 text-sm mb-2">
          Didn&apos;t receive OTP? <span className="text-blue-500 cursor-pointer">Resend OTP</span>
        </p>
      </div>
    </div>
  );
}

export default OTP;
