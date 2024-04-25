import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { MdOutlineHomeWork } from "react-icons/md";


const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className=" h-96 p-4 text-black">
      <h5 className="text-base flex gap-2 font-semibold text-gray-500 uppercase dark:text-gray-700">
        <span className="text-2xl">
          <AiOutlineAppstoreAdd />
        </span>
        <span>Menu</span>
      </h5>

      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
        <li>
                <Link
                  to="/home"
                  className={`${location.pathname === "/home" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl"><MdOutlineHomeWork /></span>
                  <span className="ms-3">Home</span>
                </Link>
              </li>
          {user?.role === "organisation" && (
            <>
              <li>
                <Link
                  to="/inventory"
                  className={`${location.pathname === "/inventory" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg`}
                >
                  <span className="text-xl"><MdOutlineInventory2 /></span>
                  <span className="ms-3">Inventory</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/donar"
                  className={`${location.pathname === "/donar" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl"><BiDonateBlood /></span>
                  <span className="ms-3">Donor</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hospital"
                  className={`${location.pathname === "/hospital" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl"><RiHospitalLine /></span>
                  <span className="ms-3">Hospital</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className={`${location.pathname === "/analytics" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl"><MdInsights /></span>
                  <span className="ms-3">Analytics</span>
                </Link>
              </li>
            </>
          )}

          {user?.role === "hospital" && (
            <>
              <li>
                <Link
                  to="/consumer"
                  className={`${location.pathname === "/consumer" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl"><MdDataUsage /></span>
                  <span className="ms-3">Utilization</span>
                </Link>
              </li>
            </>
          )}

          {user?.role === "donar" && (
            <>
              <li>
                <Link
                  to="/donation"
                  className={`${location.pathname === "/donation" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl"><BiSolidDonateBlood /></span>
                  <span className="ms-3">Donation</span>
                </Link>
              </li>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
            <>
              <li>
                <Link
                  to="/organisation"
                  className={`${location.pathname === "/organisation" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl"><VscOrganization /></span>
                  <span className="ms-3">Organisation</span>
                </Link>
              </li>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <li>
                <Link
                  to="/donar-list"
                  className={`${location.pathname === "/donar-list" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl">
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
                  </span>
                  <span className="ms-3">Donar-List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/hospital-list"
                  className={`${location.pathname === "/hospital-list" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg`}
                >
                  <span className="text-xl">
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
                  </span>
                  <span className="ms-3">Hospital-List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/organisation-list"
                  className={`${location.pathname === "/organisation-list" ? "bg-gray-700 text-white" : "hover:bg-gray-100 group"} flex items-center p-2 text-gray-900 rounded-lg `}
                >
                  <span className="text-xl">
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
                  </span>
                  <span className="ms-3">Organisation-list</span>
                </Link>
              </li>
            </>
          )}

          <li>
             <a
              onClick={logout}
              className="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
             >
               <span className="text-xl"><RiLogoutBoxLine /></span>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
             </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
