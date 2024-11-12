// src/pages/auth/main-login.js
import { useState } from 'react';
// import Login from '@/components/Login';
import Login from '../login/Login';
// import OtpVerification from '@/components/OtpVerification';
import OtpVerification from '../otp/OtpVerification';

function MainLogin() {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleOtpSent = (email) => {
    setEmail(email);
    setIsOtpSent(true);
  };

  return (
    <div className="main-login">
      {isOtpSent ? (
        <OtpVerification email={email} />
      ) : (
        <Login onOtpSent={handleOtpSent} />
      )}
    </div>
  );
}

export default MainLogin;
