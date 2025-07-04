import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSendSharp } from "react-icons/io5";
import 'antd/dist/reset.css';
import { userChat } from '../../../../redux/Slices/userSlice';
import { Popover, Spin } from 'antd';
import { Link } from 'react-router';
import { SyncLoader } from 'react-spinners';

const ChatBody = () => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const allChat = useSelector(state => state.user.message);
  const dispatch = useDispatch();

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setLoading(true);
    const message = { id: Date.now(), sender: 'sender', text: inputValue };

    setTimeout(() => {
      dispatch(userChat(message));
      setInputValue('');
      setLoading(false);
    }, 1500);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const el = document.getElementById("scroller");
    if (el) el.scrollTop = el.scrollHeight;
  }, [allChat.length]);

  return (
    <div className="">
      <div className="flex justify-end p-2">
        <Popover
          content={
            <div className='flex flex-col gap-3'>
              <h4>Edit</h4>
              <Link to='/calender'>
                <h4>Pin To Calendar</h4>
              </Link>
            </div>
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <GiHamburgerMenu size={20} />
        </Popover>
      </div>

      <div className="h-[85vh] flex flex-col bg-gray-100 p-4">
        {/* Chat Messages */}
        <div
          id="scroller"
          className="flex-1 overflow-y-auto space-y-2 mb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {allChat.map(msg => (
            <div
              key={msg.id}
              className={`max-w-xs px-4 py-3 rounded-lg shadow ${
                msg.sender === 'sender'
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-white text-black self-start mr-auto'
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* ✅ Ant Design Spinner */}
       {loading && (
  <div className="flex justify-end mt-2 min-h-[30px] mr-36 items-center">
    <SyncLoader />
  </div>
)}

        </div>

        {/* Input Box */}
        <div className="relative">
          <TextArea
            rows={3}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Enter your message..."
            className="pr-10 resize-none"
            disabled={loading}
          />
          <IoSendSharp
            size={25}
            className={`absolute right-4 top-6 cursor-pointer ${loading ? 'text-gray-400' : 'text-blue-500'}`}
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
