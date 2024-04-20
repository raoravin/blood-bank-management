import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authActions";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login"); // Redirect to the login page after logout using useNavigate
  };
  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">Blood Bank App</div>
          <div className="navbar-nav">
            <ul className="navbar-nav flex-row">
              <li className="nav-item mx-3">
                <p className="nav-link">
                  <span className="fs-3">
                    <LuUserCircle2 />{" "}
                  </span>
                  <span>
                    {user?.fullName ||
                      user?.hospitalName ||
                      user?.organisationName}{" "}
                  </span>
                  &nbsp;
                  <span className="badge bg-secondary">{user?.role}</span>
                </p>
              </li>
              {location.pathname === "/" ||
              location.pathname === "/donar" ||
              location.pathname === "/hospital" ||
              location.pathname === "/inventory" ? (
                <>
                  <li className="nav-item mx-3">
                    <Link to="/analytics" className="nav-link">
                      Analytics
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item mx-3">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              )}
              <li className="nav-item mx-3">
                <button onClick={logout} className="btn mt-3  btn-danger">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
