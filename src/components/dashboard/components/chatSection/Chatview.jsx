import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Tooltip, Empty, Popover } from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  EditOutlined,
  CopyOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import Editor from './Editor';
import TimeNDatePicker from '../../../others/TimeNDatePicker';
import CustomModal from '../../../others/Modal';

const Chatview = () => {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const chat = location?.state?.date;
  const messages = chat?.messages || [];
  const chatDate = chat?.timestamp ? new Date(chat.timestamp) : null;

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const calendarContent = (
    <div className="p-4">
      <TimeNDatePicker data={chat} />
      {chatDate && (
        <div className="mt-4 text-sm text-gray-600">
          <div className="font-medium">Original chat time:</div>
          <div>
            {chatDate.toLocaleDateString()} at {chatDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-[#fefefe] min-h-screen font-mono text-sm">
      {/* Top Button Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Popover
          content={calendarContent}
          title="Pin to Calendar"
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button icon={<CalendarOutlined />}>Pin to Calendar</Button>
        </Popover>
        <Button icon={<CheckCircleOutlined />} onClick={() => setIsModalOpen(true)}>
                 Add to Class
               </Button>
        <Button onClick={() => setEdit(state => !state)} icon={<EditOutlined />}>Edit</Button>
        <Button icon={<CopyOutlined />}>Copy</Button>
        <Button icon={<ExportOutlined />}>Export</Button>
      </div>

      {/* Chat Title and Date Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 underline underline-offset-4">
          {chat?.title || 'Untitled Chat'}
        </h1>
        {chatDate && (
          <div className="text-sm text-gray-500 mt-1">
            <span>Created: </span>
            <Tooltip title={chatDate.toLocaleString()}>
              <span>
                {chatDate.toLocaleDateString()} at {chatDate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Chat Content */}
      {!edit && (
        <div className="whitespace-pre-wrap leading-relaxed border border-dashed border-gray-300 p-4 bg-[#fffffc] shadow-inner rounded-md max-w-full">
          {messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div key={msg.id || idx} className="mb-4">
                <p className="text-gray-700">
                  <strong>{msg.sent_by === 'user' ? 'You' : 'Bot'}:</strong>{' '}
                  {msg.message_content}
                  {msg.edited && (
                    <span className="ml-2 text-xs italic text-gray-400">
                      (edited)
                    </span>
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
      )}

      {/* Editor Section */}
      {edit && (
        <div>
          <Editor messages={messages} id={chat.id} chat={chat} />
        </div>
      )}

           <CustomModal
        isModalOpen={isModalOpen}
        chat={chat}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default Chatview;