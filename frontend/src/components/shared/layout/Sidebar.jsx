import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { userMenu } from "./menus/UserMenu";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BiSolidDonateBlood } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logoutUser } from "../../../redux/features/auth/authActions";
import { MdDataUsage } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdOutlineInventory2 } from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import { RiHospitalLine } from "react-icons/ri";
import { MdInsights } from "react-icons/md";








const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login"); // Redirect to the login page after logout using useNavigate
  };
  return (
    // <div>
    //   <div classNameName="fixed  text-white z-40 h-screen p-4   w-64 dark:bg-gray-800">
    //     <div classNameName="">
    //       {/* {userMenu.map((menu) => {
    //                 const isActive = location.pathname === menu.path
    //                 return (
    //                     <div key={menu.id} classNameName={`menu-item ${isActive ? 'active' : ""}`}>
    //                         <i classNameName={menu.icon}></i>
    //                         <Link to={menu.path}>{menu.name}</Link>
    //                     </div>
    //                 )
    //             })} */}
    //       {user?.role === "organisation" && (
    //         <>
    //           <div
    //             classNameName={` ${location.pathname === "/inventory" && "active"}`}
    //           >
    //             <i classNameName="fa-solid fa-warehouse"></i>
    //             <Link to="/inventory">Inventory</Link>
    //           </div>
    //           <div
    //             classNameName={` ${
    //               location.pathname === "/donar" && "active"
    //             }`}
    //           >
    //             <i classNameName="fa-solid fa-hand-holding-medical"></i>
    //             <Link to="/donar">Donor</Link>
    //           </div>
    //           <div
    //             classNameName={` ${
    //               location.pathname === "/hospital" && "active"
    //             }`}
    //           >
    //             <i classNameName="fa-solid fa-hospital"></i>
    //             <Link to="/hospital">Hospital</Link>
    //           </div>
    //         </>
    //       )}
    //       {user?.role === "admin" && (
    //         <>
    //           <div
    //             classNameName={` ${location.pathname === "/donar-list" && "active"}`}
    //           >
    //             <i classNameName="fa-solid fa-warehouse"></i>
    //             <Link to="/donar-list ">Donar-List</Link>
    //           </div>
    //           <div
    //             classNameName={`${
    //               location.pathname === "/hospital-list" && "active"
    //             }`}
    //           >
    //             <i classNameName="fa-solid fa-hand-holding-medical"></i>
    //             <Link to="/hospital-list">Hospital-List</Link>
    //           </div>
    //           <div
    //             classNameName={` ${
    //               location.pathname === "/organisation-list" && "active"
    //             }`}
    //           >
    //             <i classNameName="fa-solid fa-hospital"></i>
    //             <Link to="/organisation-list">Organisation-List</Link>
    //           </div>
    //         </>
    //       )}
    //       {(user?.role === "donar" || user?.role === "hospital") && (
    //         <>
    //           <div
    //             classNameName={` ${
    //               location.pathname === "/organisation" && "active"
    //             }`}
    //           >
    //             <i classNameName="fa-solid fa-building-ngo"></i>
    //             <Link to="/organisation">Organisation</Link>
    //           </div>
    //         </>
    //       )}
    //       {(user?.role === "hospital") && (
    //         <>
    //           <div
    //             classNameName={` ${
    //               location.pathname === "/consumer" && "active"
    //             }`}
    //           >
    //             <i classNameName="fa-solid fa-building-ngo"></i>
    //             <Link to="/consumer">Consumer</Link>
    //           </div>
    //         </>
    //       )}
    //       {(user?.role === "donar") && (
    //         <>
    //           <div
    //             classNameName={` ${
    //               location.pathname === "/donation" && "active"
    //             }`}
    //           >
    //             <i classNameName="fa-solid fa-building-ngo"></i>
    //             <Link to="/donation">Donation</Link>
    //           </div>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <div className=" h-screen p-4 text-black">
      <h5 
        id="drawer-navigation-label"
        className="text-base flex gap-2 font-semibold text-gray-500 uppercase dark:text-gray-700"
      >
       <span className=" text-2xl"> <AiOutlineAppstoreAdd /></span><span>Menu</span>
      </h5>
     
      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {user?.role === "organisation" && (
            <>
              <li>
                <a
                  className={`${
                    location.pathname === "/inventory"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <span className=" text-xl"><MdOutlineInventory2 /></span>
                  <span className="ms-3">
                    <Link to="/inventory">Inventory</Link>
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={`${
                    location.pathname === "/donar"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <span className=" text-xl"><BiDonateBlood /></span>
                  <span className="ms-3">
                    <Link to="/donar">Donor</Link>
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={`${
                    location.pathname === "/hospital"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <span className=" text-xl"><RiHospitalLine /></span>
                  <span className="ms-3">
                    <Link to="/hospital">Hospital</Link>
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={`${
                    location.pathname === "/analytics"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <span className=" text-xl"><MdInsights /> </span>
                  <span className="ms-3">
                  <Link to="/analytics" className="">Analytics</Link>
                    
                  </span>
                </a>
              </li>
            </>
          )}

          {user?.role === "hospital" && (
            <>
              <li>
                <a
                  className={`${
                    location.pathname === "/consumer"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                 <span className=" text-xl"><MdDataUsage /></span>
                  <span className="ms-3">
                    <Link to="/consumer">Utilization</Link>
                  </span>
                </a>
              </li>
            </>
          )}
          {user?.role === "donar" && (
            <>
              <li>
                <a
                  className={`${
                    location.pathname === "/donation"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <span
                    className=" text-xl"><BiSolidDonateBlood /></span>
                    
                  <span className="ms-3">
                    <Link to="/donation">Donation</Link>
                  </span>
                </a>
              </li>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <>
              <li>
                <a
                  className={`${
                    location.pathname === "/organisation"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <span className=" text-xl"><VscOrganization /></span>
                  <span className="ms-3">
                    <Link to="/organisation">Organisation</Link>
                  </span>
                </a>
              </li>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <li>
                <a
                  className={`${
                    location.pathname === "/donar-list"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">
                    {" "}
                    <Link to="/donar-list ">Donar-List</Link>
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={`${
                    location.pathname === "/hospital-list"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">
                    <Link to="/hospital-list">Hospital-List</Link>
                  </span>
                </a>
              </li>
              <li>
                <a
                  className={`${
                    location.pathname === "/organisation-list"
                      ? "bg-gray-700 text-white"
                      : ""
                  } flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">
                    <Link to="/hospital">Organisation-list</Link>
                  </span>
                </a>
              </li>
            </>
          )}

          <li>
            <a
              onClick={logout}
              className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group`}
            >
              <span className=" text-xl"><RiLogoutBoxLine /></span>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
