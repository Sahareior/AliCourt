import { Button, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { FaEyeDropper } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';

const Verify = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        
        // Only allow single digit numbers
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto focus to next input
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        // Move focus to previous input on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div>
            <div className='w-[573px] h-[810px] mt-8 flex justify-center items-center gap-6 flex-col mx-auto my-auto' style={{ boxShadow: '0px 4px 100px 0px rgba(0, 0, 0, 0.25)' }}>
                <div className='flex gap-3 justify-center items-center'>
                    <img className='w-[45.88px] h-[33.02px]' src="/images/auth/Vector.png" alt="" />
                    <h4 className='text-[#521DA4] font-bold'>GAMEPLAN</h4>
                </div>

                <div className='flex flex-col w-[441px] gap-6 justify-center items-center'>
                    <h4 className='text-[14px]'>Congratulations! Please enter your 6 digit code</h4>
                    <div>
                        <h3 className='text-[48px] font-semibold'>Login To Account</h3>
                    </div>
                </div>

                {/* Added OTP Input Fields */}
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

                <Button style={{
                    background: 'linear-gradient(90.9deg, #051960 3.04%, #591DA9 96.03%)'
                }} className='bg-[rgba(89, 29, 169, 1)] w-[482px] h-[54px] rounded-[30px] text-white'>Verify</Button>
                <p>You have not received the email?  Resend?</p>
            </div>
        </div>
    );
};

export default Verify;