import React from 'react';

function AdminLogin() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-center text-2xl font-semibold mb-4">Admin Login</h1>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full py-3 px-4 border rounded-none border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 px-4 border rounded-none border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 my-5 bg-black text-white rounded-none hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
