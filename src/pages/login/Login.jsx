import Link from 'next/link';
import React, { useState } from 'react';
import { account } from '@/appwrite';
import { useRouter } from 'next/router';

function Login() {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const router = useRouter();

  const requestOTP = async (e) => {
    e.preventDefault();
    console.log('Account object:', account); // Check if createPhoneSession exists
    try {
      const fullPhoneNumber = `${countryCode}${phone}`;
      await account.createPhoneSession(fullPhoneNumber); // Call createPhoneSession
      alert('OTP sent to your phone.');
      router.push('/otp');
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      alert('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-fit bg-white px-5 py-10">
      <div className="w-full max-w-md bg-white">
        <h1 className="text-center text-2xl font-semibold mb-4">Login</h1>
        <p className="text-center font-thin mb-8">Enter your Login Details</p>

        <form onSubmit={requestOTP} className="space-y-6">
          <div className="flex items-center border border-gray-400 rounded">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="p-2 rounded-l-sm bg-none py-2 border-r-2"
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
            </select>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-grow py-4 px-3 text-lg rounded-r-sm border-gray-300 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 my-5 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-colors"
          >
            Request OTP
          </button>

          <div className="text-center text-sm text-gray-400 my-2">OR</div>

          <button
            type="button"
            className="w-full py-3 border flex justify-center gap-5 border-gray-400 text-xl text-black rounded-sm hover:bg-gray-100"
          >
            <i className="ri-google-fill text-2xl"></i> Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
