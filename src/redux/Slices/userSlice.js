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
    selectedChat: null,
    value: 0,
    classes: getLocal('classes', []),
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
  const existing = state.edited.find(e => e.id === action.payload.id);
  if (!existing) {
    state.edited.push(action.payload);
  } else {
    Object.assign(existing, action.payload); // or replace if needed
  }
  localStorage.setItem('edited', JSON.stringify(state.edited));
},
    userChat: (state, action) => {
      state.message.push(action.payload);
    },
    userClass: (state, action) => {
      state.classes.push(action.payload);
      localStorage.setItem('classes', JSON.stringify(state.classes));
    },
    addClass: (state, action) => {
      state.classes.push(action.payload);
      localStorage.setItem('classes', JSON.stringify(state.classes));
    },
    userConversation: (state, action) => {
      state.chat.push(action.payload);
    },
    clearChat: (state) => {
      state.chat = [];
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
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
    }
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
  addEdited
} = userSlice.actions;

export default userSlice.reducer;
