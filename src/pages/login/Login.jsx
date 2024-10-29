import Link from 'next/link';
import React from 'react';

function Login() {
  return (
    <div className="flex justify-center items-center min-h-fit bg-white px-5 py-10">
      <div className="w-full max-w-md bg-white">
        {/* Heading */}
        <h1 className="text-center text-2xl font-semibold mb-4">Login</h1>
        <p className="text-center font-thin mb-8">Enter your Log in Details</p>

        {/* Form */}
        <form className="space-y-6">
          {/* Country Code and Phone Input */}
          <div className="flex items-center border border-gray-400 rounded">
            <select className=" p-2 rounded-l-sm text-sm py-3 border-r-2">
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              {/* Add other countries as needed */}
            </select>
            <input
              type="tel"
              placeholder="Phone number"
              className="flex-grow py-4 px-3 text-lg rounded-r-sm border-gray-300 focus:outline-none"
            />
          </div>

          {/* Request OTP Button */}
        <Link href="/otp"><button
            type="submit"
            className="w-full py-3 my-5 bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-colors"
          >
            Request OTP
          </button></Link>

          {/* Divider */}
          <div className="text-center text-sm text-gray-400 my-2">OR</div>

          {/* Google Login Button */}
          <button
            type="button"
            className="w-full py-3 border flex justify-center gap-5  border-gray-400 text-xl text-black rounded-sm hover:bg-gray-100"
          >
          <i class="ri-google-fill text-2xl"></i>  Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
