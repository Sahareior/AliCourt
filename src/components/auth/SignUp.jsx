import { Button, Input } from 'antd';
import React from 'react';
import { FaEyeDropper } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';

const SignUp = () => {
    return (
        <div >
            <div className='w-[573px] h-[810px] mt-8 flex justify-center items-center gap-6 flex-col mx-auto my-auto' style={{ boxShadow: '0px 4px 100px 0px rgba(0, 0, 0, 0.25)' }}>
                <div className='flex gap-3 justify-center items-center'>
                    <img className='w-[45.88px] h-[33.02px]' src="/images/auth/Vector.png" alt="" />
                    <h4 className='text-[#521DA4] font-bold'>GAMEPLAN</h4>
                </div>

                <div className='flex flex-col w-[441px] gap-6 justify-center items-center'>
                    <h3 className='text-[48px] font-semibold'>Login To Account</h3>
                    <h4 className='text-[14px]'>Please enter your email and password to continue</h4>
                    <div className='w-full'>
                    <h2>Username</h2>
                    <Input placeholder='Username' />
                    </div>
                    <div className='w-full'>
                    <h2>Email</h2>
                    <Input placeholder='Email' />
                    </div>
                    <div className='w-full'>
                    <h2>Password</h2>
                    <Input placeholder='Password' />
                    </div>
                 <div className='w-full relative'>
                       <h2>Confirm Password</h2>
                       <Input className='relative' placeholder='Confirm Password' />
                       <FaEye className='absolute top-8 right-4' />
                 </div>
                    <div className='flex justify-between w-full'>
                        <h3>remember password</h3>
                        <h3 className='text-red-500'>forgot password?</h3>
                    </div>
                </div>

                <Button style={{
                    background: 'linear-gradient(90.9deg, #051960 3.04%, #591DA9 96.03%)'
                }} className='bg-[rgba(89, 29, 169, 1)] w-[482px] h-[54px] rounded-[30px] text-white'>Login</Button>
                <p>Don’t Have an Account? <span className='text-blue-400'>or sign up?</span> </p>
                <div className='flex justify-center items-center gap-1'>
                    <div className='bg-black h-[0.1px] w-10' />
                    <h3>or login with </h3>
                    <div className='bg-black w-10 h-[0.1px]' />
                </div>
                <div className='flex gap-3'>
                    <img src="/images/auth/Apple logo.png" alt="" />
                    <img src="/images/auth/Facebook.png" alt="" />
                    <img className='w-[42px] h-[42px]' src="/images/auth/google.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
