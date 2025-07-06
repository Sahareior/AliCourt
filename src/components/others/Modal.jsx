import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FolderOpenOutlined } from '@ant-design/icons';
import { addClass, addClassWithChat } from '../../redux/Slices/userSlice';

const CustomModal = ({ isModalOpen, setIsModalOpen,chat}) => {
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
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Ok"
      
      cancelText="Cancel"
    >
  <div className="p-4">
    {/* Title */}
    <h2 className="text-lg font-semibold mb-3">Select or Create Class</h2>

    {/* Input Field */}
    <Input
      placeholder="Enter folder name"
      className="mb-3"
      onChange={e=>setInput(e.target.value)}
    />

    {/* Create Button */}
    <Button
    onClick={()=>  dispatch(addClass({ id: Date.now(), input: input }))}
      type="primary"
      block
      className="mb-4"
    >
      Create Class
    </Button>

    {/* Available Classes */}
{
  classes && <div>
    {
      classes?.map(data=>(
            <div key={data.id} onClick={()=> handleAddClass(data.id)} className="mb-4">
      <h3 className="text-sm text-gray-600 mb-2">Available Classes:</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100">
          <FolderOpenOutlined className="text-yellow-500" />
          <span>{data.input}</span>
        </div>

      </div>
    </div>
      ))
    }
  </div>
}

    {/* Close Button */}
  
  </div>
    </Modal>
  );
};

export default CustomModal;
