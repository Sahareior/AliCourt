import React, { useState } from 'react';
import { Input } from 'antd';
import { FaEye } from 'react-icons/fa6';
import AuthLayout from './AuthLayout';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout
      title="Login To Account"
      subtitle="Please enter your email and password to continue"
      buttonText="Login"
      onSubmit={() => console.log('Login', { email, password })}
    >
      <div className="w-full">
        <h2>Email</h2>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="w-full relative">
        <h2>Password</h2>
        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <FaEye className="absolute top-8 right-4 cursor-pointer" />
      </div>
    </AuthLayout>
  );
};

export default Login;
