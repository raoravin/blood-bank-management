import { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/features/auth/authActions";
import { ProtectedRoutes, UnprotectedRoutes } from "./components/RouteProtect/routeProtection";
import Donar from "./pages/Dashboard/Donar";
import Hospital from "./pages/Dashboard/Hospital";
import Organisation from "./pages/Dashboard/Organisation";
import Loader from "./components/loader";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from Redux state
  const authState = useSelector((state) => state.auth);
  const { user, loading } = authState;
  const isAuthenticated = !!user;

  // Fetch current user data when the component mounts
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  // Redirect logic based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    // Display a loading spinner or component while user data is being fetched
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes loggedIn={isAuthenticated}>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoutes loggedIn={isAuthenticated}>
              <Donar />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoutes loggedIn={isAuthenticated}>
              <Hospital />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/organisation"
          element={
            <ProtectedRoutes loggedIn={isAuthenticated}>
              <Organisation />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <UnprotectedRoutes loggedIn={!isAuthenticated}>
              <Login />
            </UnprotectedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <UnprotectedRoutes loggedIn={!isAuthenticated}>
              <Register />
            </UnprotectedRoutes>
          }
        />
        {/* Redirect to login page if no matching route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;