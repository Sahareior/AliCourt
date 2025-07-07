import React, { useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { Input } from 'antd';
import {
  useAddMessageToChatMutation,
  useGetMessagesQuery,
  useSendMessageMutation
} from '../../../../redux/Slices/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChat, userChat, userConversation } from '../../../../redux/Slices/userSlice';

const { TextArea } = Input;

const HandleInput = () => {
  const [message, setMessage] = useState('');
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();
  const [addMessageToChat, { isLoading: adding }] = useAddMessageToChatMutation();
  const { refetch } = useGetMessagesQuery();
  const dispatch = useDispatch();
  const selectedChat = useSelector(state => state.user.selectedChat);

  const loading = sending || adding;


console.log('this is selected',selectedChat)

const handleSend = async () => {
  if (!message.trim()) return;

  try {
    let response;

    if (selectedChat) {
      // Continue existing conversation
      response = await addMessageToChat({
        chat_id: selectedChat,
        model_name: 'Chartwright',
        message_content: message,
      }).unwrap();

      console.log('add messassssada')

      dispatch(userConversation({
        ...response.data,
        chat_id: selectedChat
      }));
       
    } else {
      // Create new conversation
      response = await sendMessage({
        model_name: 'Chartwright',
        message_content: message,
      }).unwrap();

      dispatch(setSelectedChat(response.data.id))
      const newChat = response.data;
      dispatch(userChat(newChat));     // Sets selectedChat
      dispatch(userConversation({
        ...newChat,
        chat_id: newChat.id
      }));
    }

    setMessage('');
    refetch();
  } catch (err) {
    console.error('Send failed:', err);
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
