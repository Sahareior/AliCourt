import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Button, Tooltip, Empty } from 'antd';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  EditOutlined,
  CopyOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import Editor from './Editor';

const Chatview = () => {
    const [edit,setEdit] = useState(false)
  const location = useLocation();
  const chat = location?.state?.date;
  const messages = chat?.messages || [];
    console.log('all messages', chat.chat)
  return (
    <div className="p-6 bg-[#fefefe] min-h-screen font-mono text-sm">
      {/* Top Button Bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button icon={<CalendarOutlined />}>Pin to Calendar</Button>
        <Button icon={<CheckCircleOutlined />}>Add to Class</Button>
        <Button onClick={()=> setEdit(state=> !state)} icon={<EditOutlined />}>Edit</Button>
        <Button icon={<CopyOutlined />}>Copy</Button>
        <Button icon={<ExportOutlined />}>Export</Button>
      </div>

      {/* Chat Title */}
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 underline underline-offset-4">
        {chat?.title || 'Untitled Chrat'}
      </h1>
      {
        !edit &&       <div className="whitespace-pre-wrap leading-relaxed border border-dashed border-gray-300 p-4 bg-[#fffffc] shadow-inner rounded-md max-w-3xl">
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
      }

      {
        edit && <div>
            <Editor messages={messages} id={chat.id} />
        </div>
      }
    </div>
  );
};

export default Chatview;
