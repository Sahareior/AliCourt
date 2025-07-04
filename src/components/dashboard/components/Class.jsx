import React, { useState } from 'react';
import { Button } from 'antd';
import CustomModal from '../../others/Modal';

const Class = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        className="text-white"
        style={{
          background: 'linear-gradient(91.53deg, #051DA9 2.34%, #591DA9 96.97%)',
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Create a class
      </Button>

      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Class;
