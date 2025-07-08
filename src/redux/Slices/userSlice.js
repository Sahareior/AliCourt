import { createSlice } from '@reduxjs/toolkit';

// Utility to get data from localStorage
const getLocal = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

// Slice
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    message: [
      { id: 1, sender: 'receiver', text: 'Hey! How are you?' },
      { id: 2, sender: 'sender', text: 'I’m good, what about you?' },
      { id: 3, sender: 'receiver', text: 'Doing great, thanks for asking!' },
    ],
    chat: [],
    pinned: [],
    selectedChat: null,
    chatLoading:false,
    value: 0,
    classes: getLocal('classes', []),
    classWithChat: getLocal('ClassWithChat',[]),
    edited: getLocal('edited', []),
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },

addEdited: (state, action) => {
  const { chat, jsonMessages } = action.payload;
  const existingIndex = state.edited.findIndex(e => e.id === chat.id);

  if (existingIndex === -1) {
    
    state.edited.push({ ...chat, messages: jsonMessages });
  } else {
   
    state.edited[existingIndex] = { 
      ...state.edited[existingIndex], 
      messages: jsonMessages 
    };
  }

  localStorage.setItem('edited', JSON.stringify(state.edited));
},

    userChat: (state, action) => {
      state.chat.push(action.payload);
    },
    userClass: (state, action) => {
      state.classes.push(action.payload);
      localStorage.setItem('classes', JSON.stringify(state.classes));
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
      localStorage.setItem('classes', JSON.stringify(state.classes));
    },
    addClassWithChat: (state, action) => {
      state.classWithChat.push(action.payload);
      localStorage.setItem('ClassWithChat', JSON.stringify(state.classWithChat));
    },

    // localStorage.setItem('datetime', JSON.stringify(updated)); 
    
// Modify the userConversation reducer
userConversation: (state, action) => {
  const payload = action.payload;
  const chatId = payload.chat_id || payload.id;
  
  // Find existing chat
  const existingChatIndex = state.chat.findIndex(chat => chat.id === chatId);
  
  if (existingChatIndex !== -1) {
    // Merge new messages with existing ones
    const existingMessages = state.chat[existingChatIndex].messages;
    const newMessages = payload.messages;

    
    // Create a map for quick lookup
    const messageMap = new Map();
    existingMessages.forEach(msg => messageMap.set(msg.id, msg));
    
    // Merge messages without duplicates
    const mergedMessages = [...existingMessages];
    newMessages.forEach(newMsg => {
      if (!messageMap.has(newMsg.id)) {
        mergedMessages.push(newMsg);
        messageMap.set(newMsg.id, newMsg);
      }
    });
    
    // Update chat with merged messages
    state.chat[existingChatIndex] = {
      ...state.chat[existingChatIndex],
      ...payload,
      messages: mergedMessages
    };
  } else {
    // Create new chat entry
    state.chat.push({
      id: chatId,
      ...payload,
      messages: payload.messages
    });
  }
},

  setChatLoading: (state,action) =>{
    state.chatLoading = action.payload
  },

    clearChat: (state) => {
      state.chat = [];
    },

    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },

    clear: (state) => {
  state.chat = [];
  state.selectedChat = null; // 
},
    updatedMessage: (state, action) => {
      const chat = state.edited.find(chat => chat.id === action.payload.id);
      if (chat) {
        chat.messages = action.payload.messages;
        localStorage.setItem('edited', JSON.stringify(state.edited));
        console.log('✅ Updated chat:', chat);
      } else {
        console.warn('❌ Chat not found for ID:', action.payload.id);
      }
    },

    pinnedCalendar: (state, action) => {
      const { conversationArray, date } = action.payload;
      const existingChat = state.pinned.find(chat => chat.id === conversationArray.id);

      if (existingChat) {
        existingChat.date = date; // Update the date if chat already exists
      } else {
        state.pinned.push({ id: conversationArray, date }); // Add new pinned chat
      }
    },

  },
});

export const {
  incremented,
  decremented,
  userChat,
  userConversation,
  clearChat,
  setSelectedChat,
  addClass,
  userClass,
  updatedMessage,
  addEdited,
  addClassWithChat,
  pinnedCalendar,
  setChatLoading,
  clear,
} = userSlice.actions;

export default userSlice.reducer;
