import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authActions";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Import useNavigate
import { SiSimpleanalytics } from "react-icons/si";

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
      {/* <nav className="navbar">
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
                    <SiSimpleanalytics />
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
      </nav> */}
      <header>
    <nav class=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between  pb-2 ">
            <a href="https://flowbite.com" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto " id="mobile-menu-2">
                <ul class="flex flex-col mt- font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                    </li>
                    {/* <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                    </li> */}
                    {/* <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                    </li> */}
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                    </li>
                    <li className="">
                <p className=" text-white flex">
                  <span className="fs-3">
                    <LuUserCircle2 />{" "}
                  </span>
                  {/* <span>
                    {
                    // user?.fullName ||
                      // user?.hospitalName ||
                      // user?.organisationName}{" "}
                  </span> */}
                  &nbsp;
                  <span className="badge bg-secondary">{user?.role}</span>
                </p>
              </li>
                </ul>
            </div>
            <div className=" text-white">
            {location.pathname === "/" ||
              location.pathname === "/donar" ||
              location.pathname === "/hospital" ||
              location.pathname === "/inventory" ? (
                <>
                  
                    {
                      user?.role === "organisation" && <Link to="/analytics" className="">
                      <SiSimpleanalytics />
                    </Link>
                    }
                </>
              ) : (
                  <Link to="/" className="">
                    Home
                  </Link>

              )}
            </div>
           
        </div>
    </nav>
</header>
    </>
  );
};

export default Header;
