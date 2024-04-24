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
import Analytics from "./pages/Dashboard/Analytics";
import Inventory from "./pages/Dashboard/Inventory";
import DonarList from "./pages/admin/DonarList";
import HospitalList from "./pages/admin/HospitalList";
import OrgList from "./pages/admin/OrgList";
import { ToastToggle } from "flowbite-react";

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
    if(!userId && location.pathname === "/") {
      navigate("/login")
    }
  }, [dispatch]);




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
              <Consumer />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Donation />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Analytics />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <Inventory />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <DonarList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <HospitalList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/organisation-list"
          element={
            <ProtectedRoutes loggedIn={userId ? true : false}>
              <OrgList />
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
