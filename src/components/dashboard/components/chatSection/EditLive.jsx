import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { Button, Tooltip, Empty } from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  EditOutlined,
  CopyOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import Editor from './Editor';
import CustomModal from '../../../others/Modal';
import { addEdited } from '../../../../redux/Slices/userSlice';

const EditLive = () => {
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [calender,setCalender] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.user.classes || []);

  // Extracting chat data from location
  const chat = location?.state?.date || location?.state?.data?.[0] || {};
  const messages = chat?.messages || [];

  const handleToggleEdit = () => setEdit((prev) => !prev);
  const handleSave = () => {
    dispatch(addEdited(chat));
    setSave(true); // Optional: can be used to trigger a toast
  };

  const handleEdit=()=>{

  }

  return (
    <div className="p-6 bg-[#fefefe] min-h-screen font-mono text-sm">
      {/* Top Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={()=> setCalender(state => !state)} icon={<CalendarOutlined />}>Pin to Calendar</Button>
        <Button icon={<CheckCircleOutlined />} onClick={() => setIsModalOpen(true)}>
          Add to Class
        </Button>
        <Button icon={<EditOutlined />} onClick={handleToggleEdit}>
          {edit ? 'Cancel Edit' : 'Edit'}
        </Button>
        <Button icon={<CopyOutlined />} onClick={handleSave}>
          Save
        </Button>
        <Button icon={<ExportOutlined />}>Copy</Button>
      </div>

      {/* Chat Title */}
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 underline underline-offset-4">
        {chat?.title || 'Untitled Chat'}
      </h1>

      {/* Chat Content */}
      {!edit ? (
        <div className="whitespace-pre-wrap leading-relaxed border border-dashed border-gray-300 p-4 bg-[#fffffc] shadow-inner rounded-md max-w-full">
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div key={msg.id || idx} className="mb-4">
                <p className="text-gray-700">
                  <strong>{msg.sent_by === 'user' ? 'You' : 'Bot'}:</strong> {msg.message_content}
                  {msg.edited && (
                    <span className="ml-2 text-xs italic text-gray-400">(edited)</span>
                  )}
                </p>
                <Tooltip title={new Date(msg.timestamp).toLocaleString()}>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </Tooltip>
              </div>
            ))
          ) : (
            <Empty description="No messages to display" />
          )}
        </div>
      ) : (
         <Editor messages={messages} id={chat} chat={chat} />
      )}

      {/* Modal */}
      <CustomModal
        isModalOpen={isModalOpen}
        chat={chat}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default EditLive;
