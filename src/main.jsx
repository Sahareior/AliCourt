import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import App from './App.jsx'

import ChatBody from './components/dashboard/components/chatSection/ChatBody.jsx';
import Calender from './components/dashboard/components/Calender.jsx';
import Class from './components/dashboard/components/Class.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Profile from './components/dashboard/components/profile/Profile.jsx';
import Login from './components/auth/Login.jsx';
import SignUp from './components/auth/SignUp.jsx';
import Chatview from './components/dashboard/components/chatSection/Chatview.jsx';
import EditLive from './components/dashboard/components/chatSection/EditLive.jsx';
import ClassBySec from './components/dashboard/components/ClassBySec.jsx';
import RecentHistory from './components/dashboard/components/chatSection/RecentHistory.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: 'new-chat',
        element: <ChatBody />
      },
      {
        path: 'calender',
        element: <Calender />
      },
      {
        path: 'class',
        element: <Class />,
        children:[
          
          {
            path: 'allclass/:id',
            element: <ClassBySec />
          }
        ]
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path:'edit-chat',
        element: <Chatview />
      },
      {
        path: 'editLiveChat',
        element: <EditLive />
      },
      {
        path: 'history',
        element: <RecentHistory />
      }

    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <SignUp />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
