import React, { useState } from 'react';
import { Input } from 'antd';
import { FaEye } from 'react-icons/fa6';
import AuthLayout from './AuthLayout'; // Adjust path

const SetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout
      title="Set new Password"
      subtitle="Create a new password. Ensure it differs from your previous one."
      buttonText="Confirm Password"
      onSubmit={() => console.log('Submit', email, password)}
    >
      <div className="w-full">
        <h2>Email</h2>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="w-full relative">
        <h2>Password</h2>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FaEye className="absolute top-8 right-4 cursor-pointer" />
      </div>
    </AuthLayout>
  );
};

export default SetPassword;
