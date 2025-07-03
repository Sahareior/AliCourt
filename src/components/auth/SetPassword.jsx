import { Button, Input } from 'antd';
import React from 'react';
import { FaEyeDropper } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';

const SetPassword = () => {
    return (
        <div >
            {/* <div className='w-[573px] h-[810px] mt-8 flex justify-center items-center gap-6 flex-col mx-auto my-auto' style={{ boxShadow: '0px 4px 100px 0px rgba(0, 0, 0, 0.25)' }}>
                <div className='flex gap-3 justify-center items-center'>
                    <img className='w-[45.88px] h-[33.02px]' src="/images/auth/Vector.png" alt="" />
                    <h4 className='text-[#521DA4] font-bold'>GAMEPLAN</h4>
                </div>

                <div className='flex flex-col w-[441px] gap-6 justify-center items-center'>
                    <h4 className='text-[14px]'>Create a new password.
insure it differs from previous one.</h4>
                    <h3 className='text-[30px] '>Set new Password</h3>
                    <div className='w-full'>
                    <h2>Email</h2>
                    <Input placeholder='Email' />
                    </div>
                 <div className='w-full relative'>
                       <h2>Password</h2>
                       <Input className='relative' placeholder='Password' />
                       <FaEye className='absolute top-8 right-4' />
                 </div>
                    <div className='flex justify-between w-full'>
                        <h3>remember password</h3>
                        <h3 className='text-red-500'>forgot password?</h3>
                    </div>
                </div>

                <Button style={{
                    background: 'linear-gradient(90.9deg, #051960 3.04%, #591DA9 96.03%)'
                }} className='bg-[rgba(89, 29, 169, 1)] w-[482px] h-[54px] rounded-[30px] text-white'>Confirm Password</Button>



            </div> */}
            {/* This Part is Congratulations Part */}

            <div>
                            <div className='w-[573px] h-[810px] mt-8 flex justify-center items-center gap-12 flex-col mx-auto my-auto' style={{ boxShadow: '0px 4px 100px 0px rgba(0, 0, 0, 0.25)' }}>
                <div className='flex gap-3 justify-center items-center'>
                    <img className='w-[45.88px] h-[33.02px]' src="/images/auth/Vector.png" alt="" />
                    <h4 className='text-[#521DA4] font-bold'>GAMEPLAN</h4>
                </div>

                    <h4 className='text-[14px]'>Your password has been updated, please change your password regularly.</h4>
                    <h3 className='text-[30px] '>Set new Password</h3>

                <Button style={{
                    background: 'linear-gradient(90.9deg, #051960 3.04%, #591DA9 96.03%)'
                }} className='bg-[rgba(89, 29, 169, 1)] w-[482px] h-[54px] rounded-[30px] text-white'>Login</Button>



            </div>
            </div>
        </div>
    );
};

export default SetPassword;
