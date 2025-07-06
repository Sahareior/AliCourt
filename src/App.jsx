import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/auth/Login'
import Verify from './components/auth/Verify'
import SetPassword from './components/auth/SetPassword'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'

function App() {
  const user = true

  return (
<>
{
  user ? <Dashboard /> : <Login />
}
</>
  )
}

export default App
