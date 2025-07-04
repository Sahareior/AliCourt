import React from 'react';
import { Input, Modal } from 'antd';

const CustomModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleOk = () => {
    setIsModalOpen(false);
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
    <Input placeholder='Enter your class name' />
</div>
    </Modal>
  );
};

export default CustomModal;
