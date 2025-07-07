import React, { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSendSharp } from "react-icons/io5";
import 'antd/dist/reset.css';
import { clearChat, userConversation } from '../../../../redux/Slices/userSlice';
import { Popover, Spin } from 'antd';
import { Link } from 'react-router';
import HandleInput from './HandleInput';
import { useGetChatByIdQuery } from '../../../../redux/Slices/apiSlice';

const ChatBody = () => {
  const [open, setOpen] = useState(false);
  const allConversation = useSelector(state => state.user.chat);
  const selectedChat = useSelector(state => state.user.selectedChat);
  const dispatch = useDispatch();

  const {
    data,
    isLoading,
    refetch,
    isFetching
  } = useGetChatByIdQuery(selectedChat, {
    skip: !selectedChat, // Only run if chat is selected
    refetchOnMountOrArgChange: true, // <- important
  });

  useEffect(() => {
    if (selectedChat) {
      dispatch(clearChat()); // clear previous messages on chat switch
      refetch(); // <- force refetch even if cache exists
    }
  }, [selectedChat, dispatch, refetch]);

  useEffect(() => {
    if (data?.data?.messages) {
      dispatch(userConversation(data.data)); // Set new chat messages
    }
  }, [data, dispatch]);

  useEffect(() => {
    const el = document.getElementById("scroller");
    if (el) el.scrollTop = el.scrollHeight;
  }, [allConversation]);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  if (isLoading || isFetching || allConversation.length < 0) {
    return <p>Loading....</p>;
  }

  return (
    <div className="">
      <div className="flex justify-end p-2">
        <Popover
          content={
            <div className='flex flex-col gap-3'>
              <Link to='/editLiveChat' state={{ data: allConversation }}>Edit</Link>
              <Link to='/calender'><h4>Pin To Calendar</h4></Link>
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
        <div
          id="scroller"
          className="flex-1 overflow-y-auto space-y-2 mb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {isFetching ? (
            <div className="flex justify-center items-center h-full">
              <Spin size="large" tip="Loading messages..." />
            </div>
          ) : allConversation?.length > 0 ? (
            allConversation.map(chat =>
              chat.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`max-w-xs px-4 py-3 rounded-lg shadow ${msg.sent_by === 'user'
                    ? 'bg-blue-500 text-white self-end ml-auto'
                    : 'bg-white text-black self-start mr-auto'
                    }`}
                >
                  {msg.message_content}
                </div>
              ))
            )
          ) : (
            <div className="text-center text-gray-400">No messages found</div>
          )}
        </div>

        <div className="relative">
          <HandleInput />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
