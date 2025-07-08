import React, { useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { Input } from 'antd';
import {
  useAddMessageToChatMutation,
  useGetMessagesQuery,
  useSendMessageMutation
} from '../../../../redux/Slices/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setChatLoading, setSelectedChat, userChat, userConversation } from '../../../../redux/Slices/userSlice';

const { TextArea } = Input;

const HandleInput = () => {
  const [message, setMessage] = useState('');
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();
  const [addMessageToChat, { isLoading: adding }] = useAddMessageToChatMutation();
  const { refetch } = useGetMessagesQuery();
  const dispatch = useDispatch();
  const selectedChat = useSelector(state => state.user.selectedChat);

  const loading = sending || adding;

const handleSend = async () => {
  if (!message.trim()) return;
  
  // Generate unique ID for optimistic update
  const optimisticId = `opt-${Date.now()}`;
  
  // Create optimistic payload - only user message
  const optimisticPayload = {
    chat_id: selectedChat || optimisticId,
    messages: [{
      id: optimisticId,
      sent_by: 'user',
      message_content: message,
      isOptimistic: true
    }]
  };
  dispatch(setChatLoading(true))
  // Dispatch only the user message optimistically
  dispatch(userConversation(optimisticPayload));
  
  try {
    let response;
    let actualChatId = selectedChat;

    if (selectedChat) {
      // Existing chat
      response = await addMessageToChat({
        chat_id: selectedChat,
        model_name: 'Chartwright',
        message_content: message,
      }).unwrap();

      actualChatId = selectedChat;
    } else {
      // New chat
      response = await sendMessage({
        model_name: 'Chartwright',
        message_content: message,
      }).unwrap();

      actualChatId = response.data.id;
      dispatch(setSelectedChat(actualChatId));
      dispatch(userChat(response.data));
    }

    // Filter out user messages from API response
    const aiMessages = response.data.messages.filter(msg => msg.sent_by !== 'user');
    
    // Create payload with only AI response
    const aiPayload = {
      chat_id: actualChatId,
      messages: aiMessages
    };

    // Dispatch only AI response
    dispatch(userConversation(aiPayload));
    
    setMessage('');
    refetch();
    dispatch(setChatLoading(false))
  } catch (err) {
    console.error('Send failed:', err);
    // Remove optimistic message on error
    dispatch(userConversation({
      chat_id: selectedChat || optimisticId,
      messages: []
    }));

  }
};


  return (
    <div className='relative'>
      <TextArea
        rows={3}
        value={message}
        onChange={e => setMessage(e.target.value)}
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
  );
};

export default HandleInput;
