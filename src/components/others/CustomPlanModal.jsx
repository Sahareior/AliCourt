import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CheckOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { addClass, addClassWithChat } from '../../redux/Slices/userSlice';

const CustomPlanModal = ({ isModalOpen, setIsModalOpen,chat}) => {
  const [input,setInput] = useState('')
const dispatch = useDispatch()
const Number= Math.random * 1000
  const classes = useSelector((state) => state.user.classes || []);

console.log('ccccccc',chat)

  const handleOk = () => {
    setIsModalOpen(false);
    

    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddClass =(id)=>{
    dispatch(addClassWithChat({classId: id, chat: chat}))
  }

  return (
<Modal
  title="Create a Class"
  open={isModalOpen}
  footer={null} // <-- removes default buttons
  onCancel={() => setIsModalOpen(false)} // still allows closing via outside click or ESC
>

         <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
        {/* Monthly Plan */}
        <div className="w-full max-w-xs shadow-md rounded-xl text-center p-6 bg-white">
          <h2 className="text-lg font-semibold mb-2">Monthly Plan</h2>
          <div className="text-3xl font-bold mb-1">$4.99 <span className="text-base font-medium">/ per month</span></div>

          <div className="text-left space-y-2 mt-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckOutlined className="text-purple-700" />
              <span>Unlimited use of AI planner</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckOutlined className="text-purple-700" />
              <span>Unlimited use of the full suite of tools</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckOutlined className="text-purple-700" />
              <span>Priority Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckOutlined className="text-purple-700" />
              <span>Cancel anytime</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4">Auto Renews Until Canceled</p>

          <Button
            type="primary"
            className="bg-gradient-to-r from-blue-700 to-purple-700 text-white w-full rounded-md"
         
          >
            Upgrade Now
          </Button>
        </div>

        {/* Annual Plan */}
        <div className="w-full max-w-xs shadow-md rounded-xl text-center p-6 bg-white">
          <h2 className="text-lg font-semibold mb-2">Annual Plan</h2>
          <div className="text-3xl font-bold mb-1">$2.49 <span className="text-base font-medium">/ per month</span></div>
          <div className="text-sm text-gray-500 mb-4">Billed as $29.99 annually</div>

          <div className="text-left space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckOutlined className="text-purple-700" />
              <span>Unlimited use of AI planner</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckOutlined className="text-purple-700" />
              <span>Unlimited use of the full suite of tools</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckOutlined className="text-purple-700" />
              <span>Priority Support</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-4">Auto Renews Until Canceled</p>

          <Button
            type="primary"
            className="bg-gradient-to-r from-blue-700 to-purple-700 text-white w-full rounded-md"
       
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomPlanModal;
