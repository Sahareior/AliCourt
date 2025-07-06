import React, { useEffect, useState } from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { Input } from 'antd';
import {
  useAddMessageToChatMutation,
  useSendMessageMutation
} from '../../../../redux/Slices/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearChat, userConversation } from '../../../../redux/Slices/userSlice';

const { TextArea } = Input;

const HandleInput = () => {
  const [message, setMessage] = useState('');
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();
  const [addMessageToChat, { isLoading: adding }] = useAddMessageToChatMutation();
const dispatch = useDispatch()
  const loading = sending || adding;
  const selectedChat = useSelector(state => state.user.selectedChat);
console.log(selectedChat)


  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      let response;

      if (selectedChat) {
        response = await addMessageToChat({
          chat_id: selectedChat,
          model_name: 'Chartwright',
          message_content: message,
        }).unwrap();
      } else {
        response = await sendMessage({
          model_name: 'Chartwright',
          message_content: message,
        }).unwrap();
      }
      dispatch(userConversation(response.data))
// console.log('This is Response', response.data)
      setMessage('');
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
