import React, { useState } from 'react';
import { useSendMessageMutation } from '../../../../redux/Slices/apiSlice';

const HandleInput = () => {

     const [message, setMessage] = useState('');
     const [sendMessage] = useSendMessageMutation()

     const selectedChat ={
        
     }

   const handleSend = async () => {
    if (!message.trim()) return;


    try {
      let response;

      if (selectedChat?.id) {
        // Existing chat
        response = await addMessageToChat({
          chat_id: selectedChat.id,
          model_name: 'Chartwright',
          message_content: message,
        }).unwrap();
      } else {
        // New chat
        response = await sendMessage({
          model_name: 'Chartwright',
          message_content: message,
        }).unwrap();

        // if (response?.data?.id) {
        //   dispatch(setSelectedChat(response.data)); // Set new chat in Redux
        // }
      }

      setMessage('');
console.log(response)
    //   if (response?.data?.messages) {
    //    dispatch(setChat([...chat, ...response.data.messages]));

    //     // Optional scroll to bottom
    //     setTimeout(() => {
    //       const chatContainer = document.getElementById('chat-container');
    //       if (chatContainer) {
    //         chatContainer.scrollTop = chatContainer.scrollHeight;
    //       }
    //     }, 100);
    //   }

    } catch (err) {
      console.error('Send failed:', err);
    }
  };
    return (
        <div>
            
        </div>
    );
};

export default HandleInput;