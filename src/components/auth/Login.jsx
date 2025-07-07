import React, { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import { FaEye } from 'react-icons/fa6';
import AuthLayout from './AuthLayout';

// import { useNavigation } from 'react-router-dom';
import { useSigninMutation } from '../../redux/Slices/apiSlice';
import { useNavigate } from 'react-router-dom';


const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const [signin, { isLoading }] = useSigninMutation(); 

    const onFinish = async () => {
    try {
      const response = await signin({
        email: email,
        password: password,
      }).unwrap();

      if (response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        onLogin(response.accessToken);
        message.success("Login successful!");
      } else {
        message.error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        error?.data?.message || "An error occurred during login"
      );
    }
  };


  return (
    <AuthLayout
      title="Login To Account"
      subtitle="Please enter your email and password to continue"
      buttonText="Login"
     onSubmit={onFinish}
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
