import { Button, Input } from 'antd';
import React from 'react';

const Profile = () => {
 const Inputs =({name,placeholder})=>(
                    <div className='mt-4'>
                        <h3>{name}</h3>
                        <Input className='w-[499px] h-[56px]' placeholder={placeholder} />
                    </div>)
// background: linear-gradient(90deg, #00B6FE 0%, #5C7DFB 50%, #8C3AFD 100%);


    return (
        <div >
            <div className='flex gap-24 items-center mt-32 justify-center'>
                <div className='flex justify-center items-center gap-4 flex-col'>
                      <img className='w-[195px] h-[195px] rounded-full' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        <h3>Mohammad Ali</h3>
                        <Button className='w-[168px]' style={{
                            background: 'linear-gradient(90deg, #00B6FE 0%, #5C7DFB 50%, #8C3AFD 100%)'

                        }}>
                            Standard account
                        </Button>
                </div>
            <div>
            <Inputs name={'Name'} placeholder={'Enter Your Name'} />
            <Inputs name={'Email'} placeholder={'Enter Your Email'} />
            <Inputs name={'About You'} placeholder={'Tell us about yourself'} />
            <Button style={{
                background: 'linear-gradient(90deg, #00B6FE 0%, #5C7DFB 50%, #8C3AFD 100%)'

            }} className='w-[499px] mt-7 h-[54px] rounded-[30px]'>Edit Yourself</Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;