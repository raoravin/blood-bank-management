import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={ < Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
