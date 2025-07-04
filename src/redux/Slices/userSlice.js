import { createSlice, configureStore } from '@reduxjs/toolkit'
import { message } from 'antd'



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    message: [
    { id: 1, sender: 'receiver', text: 'Hey! How are you?' },
    { id: 2, sender: 'sender', text: 'I’m good, what about you?' },
    { id: 3, sender: 'receiver', text: 'Doing great, thanks for asking!' },
  ],
    value: 0,
    classes: [
      {id: 2, text: 'Hwyy Whats Up ? How are you doing?'},
      {id: 3, text: 'Where are You ? Doing Well'},
    ]
  },
  reducers: {
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    },

    userChat: (state,action)=>{
      state.message.push(action.payload)
    },
    userClass: (state,action) =>{
      state.classes.push(action.payload)
    }

  }
})

export const { incremented, decremented,userChat } = userSlice.actions
