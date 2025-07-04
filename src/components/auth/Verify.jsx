import React, { useState, useRef } from 'react';
import { Input } from 'antd';
import AuthLayout from './AuthLayout'; // Adjust path

const Verify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <AuthLayout
      title="Verify Code"
      subtitle="Congratulations! Please enter your 6 digit code"
      buttonText="Verify"
      onSubmit={() => console.log('OTP Submitted:', otp.join(''))}
      hideReminder={true}
      hideSocial={true}
      centeredContentOnly={true}
    >
      <div className="flex gap-4 justify-center">
        {otp.map((digit, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center text-xl border-gray-300 focus:border-blue-500"
          />
        ))}
      </div>
      <p>You have not received the email? <span className="text-blue-500 cursor-pointer">Resend?</span></p>
    </AuthLayout>
  );
};

export default Verify;
