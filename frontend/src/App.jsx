import { useEffect, useState } from 'react'
import {Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './redux/features/auth/authActions'
import ProtectedRoutes from './components/Routes/ProtectedRoute'
import UnprotectedRoutes from "./components/Routes/UnprotectedRoute"



function App() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()


  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch the thunk action when the component mounts
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Access user and userId from the authState
  const { user } = authState;
  const userId = user ? user._id : null;

// Additional check for the register page
useEffect(() => {
  // Assuming you want to restrict access to the register page as well
  const isRegisterPage = location.pathname === '/register';

  if (!userId && !isRegisterPage) {
    // If the user is not authenticated and is trying to access the register page, navigate to the login page
    navigate('/login');
  }
}, [userId, navigate, location.pathname]);


  return (
    <>
    <ToastContainer />
    <Routes>
    <Route
          path="/"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <UnprotectedRoutes loggedIn={userId ? true : false}>
              <Login />
            </UnprotectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <UnprotectedRoutes loggedIn={userId ? true : false}>
              <Register />
            </UnprotectedRoutes>
          }
        />
    </Routes>
    </>
  )
}

export default App
