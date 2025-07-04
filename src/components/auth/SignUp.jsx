import React, { useState } from 'react';
import { Input } from 'antd';
import { FaEye } from 'react-icons/fa6';
import AuthLayout from './AuthLayout'; // adjust path

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Please enter your info to sign up"
      buttonText="Sign Up"
      onSubmit={() => console.log('SignUp', { username, email, password, confirm })}
    >
      <div className="w-full">
        <h2>Username</h2>
        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="w-full">
        <h2>Email</h2>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="w-full">
        <h2>Password</h2>
        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="w-full relative">
        <h2>Confirm Password</h2>
        <Input placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <FaEye className="absolute top-8 right-4 cursor-pointer" />
      </div>
    </AuthLayout>
  );
};

export default SignUp;
