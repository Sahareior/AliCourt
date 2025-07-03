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
        element: <Class />
      },

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}>

  </RouterProvider>
  </StrictMode>,
)
