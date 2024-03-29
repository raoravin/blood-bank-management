import React from "react";
import { useSelector } from "react-redux";
// import { userMenu } from "./menus/UserMenu";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  //   const isActive = location.pathname
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {/* {userMenu.map((menu) => {
                    const isActive = location.pathname === menu.path
                    return (
                        <div key={menu.id} className={`menu-item ${isActive ? 'active' : ""}`}>
                            <i className={menu.icon}></i>
                            <Link to={menu.path}>{menu.name}</Link>
                        </div>
                    )
                })} */}
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to="/">Inventory</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to="/donar">Donor</Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to="/hospital">Hospital</Link>
              </div>
            </>
          )}
          {(user?.role === "donar" || user?.role === "hospital") && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/organisation" && "active"
                }`}
              >
                <i className="fa-solid fa-building-ngo"></i>
                <Link to="/organisation">Organisation</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
