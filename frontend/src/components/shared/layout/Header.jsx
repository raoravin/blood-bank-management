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
      <nav className=" py-4 text-center font-bold">
        <h1>Welcom to bbd organisation</h1>
      </nav>
      <header>
        <nav class=" border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between  pb-2 ">
            <a href="https://flowbite.com" class="flex items-center">
             
            </a>

            <div
              class="hidden justify-between items-center w-full lg:flex lg:w-auto "
              id="mobile-menu-2"
            >
              <ul class="flex flex-col mt- font-medium lg:flex-row lg:space-x-12 lg:mt-0">
                <li>
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                {/* <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                    </li> */}
                {/* <li>
                        <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                    </li> */}
                <li>
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </a>
                </li>
                <li className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                  
                    {location.pathname === "/" ||
                    location.pathname === "/donar" ||
                    location.pathname === "/hospital" ||
                    location.pathname === "/inventory" ? (
                      <>
                        {user?.role === "organisation" && (
                          <Link to="/analytics" className="">
                            <span className="flex gap-2"><SiSimpleanalytics /> <p className="">Analytics</p></span>
                          </Link>
                        )}
                      </>
                    ) : (
                      <Link to="/" className="">
                        Home
                      </Link>
                    )}

                </li>
              </ul>
            </div>

            {/* <p className=" text-white flex">
                  <span className="fs-3">
                    <LuUserCircle2 />{" "}
                  </span> */}
            {/* <span>
                    {
                    // user?.fullName ||
                      // user?.hospitalName ||
                      // user?.organisationName}{" "}
                  </span> */}
            {/* &nbsp;
                  <span className="badge bg-secondary">{user?.role}</span>
                </p> */}
            <div class=" me-10 pt-2.5">
              {/* <a href="#" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 border dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Log in</a> */}
              <a
                onClick={logout}
                class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:py-3 mr-2 border dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Log out
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
