import React, { useState,useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";

import { Skeleton, List, Avatar, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { clear, setSelectedChat, userConversation } from '../../../../redux/Slices/userSlice';
import { useGetMessagesQuery } from '../../../../redux/Slices/apiSlice';
import { useNavigate } from 'react-router-dom';


const { Text } = Typography;

const RecentChat = () => {
      const dispatch = useDispatch();
      const [click, setClick] = useState(false)
  const { data: chats, error, isLoading,refetch } = useGetMessagesQuery();
const navigate = useNavigate()

 console.log('chats', chats?.data)

  useEffect(() => {
clear()
  }, [click]);


    const generateChatTitle = (messages) => {
    if (!messages || messages.length === 0) return "Empty Chat";
    
    const firstUserMessage = messages.find(msg => msg.sent_by === 'user' && msg.message_content.trim());
    const firstBotMessage = messages.find(msg => msg.sent_by === 'bot' && msg.message_content.trim());
    
    if (firstUserMessage?.message_content) {
      return firstUserMessage.message_content.length > 30 
        ? `${firstUserMessage.message_content.substring(0, 30)}...` 
        : firstUserMessage.message_content;
    }
    
    if (firstBotMessage?.message_content) {
      return `AI: ${firstBotMessage.message_content.substring(0, 30)}...`;
    }
    
    return "Untitled Chat";
  };



  const handleChatSelect = (chat) => {
    console.log('ca',chat)
        dispatch(setSelectedChat(chat.id))
       dispatch(userConversation(chat))
       refetch()
       
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
             <div onClick={()=> {handleChatSelect(data), setClick(state => !state)}} className='flex cursor-pointer justify-between px-6 mt-3  items-center'>
      {data.title === "Untitled Chat" ? generateChatTitle(data.messages) : data.title}
     <BsThreeDots />
   </div>
    ))
}
</div>
  );
};

export default RecentChat;