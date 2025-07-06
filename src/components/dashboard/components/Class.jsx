import React, { useState } from 'react';
import { Button } from 'antd';
import CustomModal from '../../others/Modal';
import { useSelector } from 'react-redux';

const Class = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useSelector((state) => state.user.classes || []);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Your Classes</h2>
        <Button
          className="text-white font-medium"
          style={{
            background: 'linear-gradient(91.53deg, #051DA9 2.34%, #591DA9 96.97%)',
          }}
          onClick={() => setIsModalOpen(true)}
        >
          + Create a Class
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {classes.length > 0 ? (
          classes.map((info, index) => (
            <div
              key={index}
              className="bg-blue-600 text-white p-4 rounded shadow-md hover:bg-blue-700 transition w-fit max-w-xs"
            >
              {info}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No classes created yet.</p>
        )}
      </div>

      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Class;
