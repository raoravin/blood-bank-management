import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/features/auth/authActions";
import ProtectedRoutes from "./components/Routes/ProtectedRoute";
import UnprotectedRoutes from "./components/Routes/UnprotectedRoute";
import Donar from "./pages/Dashboard/Donar";
import LogOutHome from "./pages/LogOutHome";
import Hospital from "./pages/Dashboard/Hospital";
import Organisation from "./pages/Dashboard/Organisation";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authState = useSelector((state) => state.auth);
  // Access user and userId from the authState
  const { user } = authState;
  const userId = user ? user._id : null;

  useEffect(() => {
    // Dispatch the thunk action when the component mounts
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Additional check for the register page
  // useEffect(() => {
  //   // Check if the current location is the login page
  //   const isLoginPage = location.pathname === '/login';

  //   if (!userId && !isLoginPage) {
  //     // If the user is not authenticated and not on the login page, navigate to the login page
  //     navigate('/login');
  //   }
  // }, [userId, location.pathname, navigate],2000);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={userId ? <Home /> : ""} />

        <Route
          path="/donar"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Donar />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/hospital"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Hospital />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Organisation />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/consumer"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Consumer/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Donation/>
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
  );
}

export default App;
