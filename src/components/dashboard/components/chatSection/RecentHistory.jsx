import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

import { Skeleton, List, Avatar, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setSelectedChat, userConversation } from '../../../../redux/Slices/userSlice';
import { useGetMessagesQuery } from '../../../../redux/Slices/apiSlice';
import { useNavigate } from 'react-router-dom';


const { Text } = Typography;

const RecentHistory = () => {
      const dispatch = useDispatch();
  const { data: chats, error, isLoading,refatch } = useGetMessagesQuery();
const navigate = useNavigate()

 console.log('chats', chats?.data)


  const handleChatSelect = (chat) => {
    console.log('ca',chat)
        dispatch(setSelectedChat(chat.id))
       dispatch(userConversation(chat))
       navigate('/new-chat')
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading chat history: {error.message}
      </div>
    );
  }

  return (
<div>
{
    chats?.data.map(data=>(
             <div onClick={()=> handleChatSelect(data)} className='flex cursor-pointer justify-between px-6 mt-3  items-center'>
     <h4>Last Chat</h4>
     <BsThreeDots />
   </div>
    ))
}
</div>
  );
};

export default RecentHistory;