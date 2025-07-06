import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { addClass } from '../../redux/Slices/userSlice';

const CustomModal = ({ isModalOpen, setIsModalOpen }) => {
  const [input,setInput] = useState('')
const dispatch = useDispatch()

  const handleOk = () => {
    setIsModalOpen(false);
      dispatch(addClass(input))
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Create a Class"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      
      cancelText="Cancel"
    >
<div className='felx justify-center items-center'>
    <Input  onChange={e => setInput(e.target.value)} placeholder='Enter your class name' />
</div>
    </Modal>
  );
};

export default CustomModal;
