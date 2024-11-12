// src/pages/user/dashboard.jsx
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Retrieve the logged-in user's email from localStorage
    const storedEmail = localStorage.getItem('user');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleHistoryClick = () => {
    alert("No history available"); // Placeholder for future history fetch from Appwrite
  };

  return (
    <div className="dashboard p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {userEmail || "User"}</h1>
        <button
          onClick={handleHistoryClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View History
        </button>
      </header>
      <div className="content">
        <p>Here is your dashboard. You can view and manage your account information here.</p>
        <p>History and orders will be displayed here in the future.</p>
      </div>
    </div>
  );
}
