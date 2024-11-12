// src/components/Login.js
import { useState } from 'react';

function Login({ onOtpSent }) {
  const [email, setEmail] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        onOtpSent(email);
        alert('OTP sent to your email');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error sending OTP');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="input"
      />
      <button onClick={handleSendOtp} className="button">
        Send OTP
      </button>
    </div>
  );
}

export default Login;
