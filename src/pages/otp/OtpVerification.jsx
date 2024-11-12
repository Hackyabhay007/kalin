// src/components/OtpVerification.js
import { useState } from 'react';
import { useRouter } from 'next/router';

function OtpVerification({ email }) {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('OTP verified successfully');
        localStorage.setItem('user', email); // Store email in localStorage
        router.push('/user/dashboard');
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error verifying OTP');
    }
  };

  return (
    <div className="otp-verification">
      <h2>Verify OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="input"
      />
      <button onClick={handleVerifyOtp} className="button">
        Verify OTP
      </button>
    </div>
  );
}

export default OtpVerification;
