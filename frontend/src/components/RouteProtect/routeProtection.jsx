import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// ProtectedRoutes component for authenticated routes
const ProtectedRoutes = ({ loggedIn, children }) => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  // Check if the user is logged in and render the children components
  return loggedIn && user ? children : <Navigate to="/login" />;
};

// UnprotectedRoutes component for unauthenticated routes
const UnprotectedRoutes = ({ loggedIn, children }) => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  // Check if the user is not logged in and render the children components
  return !loggedIn || !user ? children : <Navigate to="/" />;
};

export { ProtectedRoutes, UnprotectedRoutes };
