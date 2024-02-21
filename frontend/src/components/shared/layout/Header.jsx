import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authActions";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                  <LuUserCircle2 /> Welcom{" "}
                  {user?.fullName ||
                    user?.hospitalName ||
                    user?.organisationName}{" "}
                  &nbsp;
                  <span className="badge badge-secondary">{user?.role}</span>
                </p>
              </li>
              <li className="nav-item mx-3">
                <button onClick={logout} className="btn btn-danger">
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
