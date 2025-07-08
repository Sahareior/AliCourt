import React, { useState, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { Skeleton, List, Avatar, Typography, Popover, Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { clear, setSelectedChat, userConversation } from '../../../../redux/Slices/userSlice';
import {  useDeleteChatByIdMutation, useGetMessagesQuery, useUpdateChatNameMutation } from '../../../../redux/Slices/apiSlice';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const RecentChat = () => {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [deleteChatById] = useDeleteChatByIdMutation()
  const { data: chats, error, isLoading, refetch } = useGetMessagesQuery();
  const navigate = useNavigate();
  const [updateChatName] = useUpdateChatNameMutation();



  console.log('chats',chats)

  useEffect(() => {
    clear();
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
    dispatch(setSelectedChat(chat.id));
    dispatch(userConversation(chat));
    refetch();
    navigate('/new-chat');
  };

const handleEdit = async (chat) => {
  try {
    const response = await updateChatName({
      id: chat.id,
      title: "My Updated Chat Name", // hardcoded
    }).unwrap();

    console.log("Update success:", response);
    refetch(); // reload chat list after update (optional)
  } catch (error) {
    console.error("Failed to update chat name:", error);
  }
};



const handleDelete = async (chat) => {
  try {
    const res = await fetch(`https://adfusionlabs.ai/api/chatbot/delete-chat/598`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete chat');
    }

    console.log("Deleted successfully");
    refetch(); // Refresh chat list
  } catch (err) {
    console.error("Delete error:", err.message);
  }
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
      {chats?.data.map((data) => {
        const content = (
          <div className="flex flex-col gap-2">
            <Button size="small" type="link" onClick={() => handleEdit(data)}>Edit</Button>
            <Button size="small" type="link" danger onClick={() => handleDelete(data)}>Delete</Button>
          </div>
        );

        return (
          <div
            key={data.id}
            className="flex cursor-pointer justify-between px-6 mt-3 items-center hover:bg-gray-100 py-2 rounded"
            onClick={() => {
              handleChatSelect(data);
              setClick(state => !state);
            }}
          >
            <div className="text-sm font-medium">
              {data.title === "Untitled Chat" ? generateChatTitle(data.messages) : data.title}
            </div>
            <Popover content={content} trigger="click">
              <BsThreeDots onClick={(e) => e.stopPropagation()} className="text-lg" />
            </Popover>
          </div>
        );
      })}
    </div>
  );
};

export default RecentChat;
