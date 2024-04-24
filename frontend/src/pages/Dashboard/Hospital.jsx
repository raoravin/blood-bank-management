import Layout from '../../components/shared/layout/Layout'
import React, { useContext, useEffect, useState } from "react";
import { todoContext } from "../../context/ListContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../components/shared/Pagination";
import TodoFilter from "../../components/shared/ListFilter";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useSelector } from "react-redux";
import { filterFunction } from "../../components/list/shared/filterFunction";
import moment from 'moment';

const Hospital = () => {
  const { todo, setTodo } = useContext(todoContext);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("newest");
  // Ensure currentPage is initialized with a valid number
const initialPage = parseInt(localStorage.getItem("currentPage"), 10);
const [currentPage, setCurrentPage] = useState(isNaN(initialPage) ? 1 : initialPage);
const todosPerPage = 8;
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const [noTodosFound, setNoTodosFound] = useState(false);

  const getHospital = async () => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      const {data }= await axios.get(
        "http://localhost:8080/api/v1/inventory/get-hospital",
        config
      );

      setTodo(data.hospital);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospital();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    if (selectedFilter !== "textFilter") {
      setSearch("");
    }
  };

  useEffect(() => {
    filterFunction(todo,setFilteredTodos,selectedFilter,setNoTodosFound,currentPage,todosPerPage,setCurrentPage,search)
  }, [todo, selectedFilter, currentPage, todosPerPage, search, setSearch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
 // Check if filteredTodos is not empty before calculating startIndex and endIndex
let startIndex = 0;
let endIndex = todosPerPage;
if (filteredTodos && filteredTodos.length > 0) {
  startIndex = (currentPage - 1) * todosPerPage;
  endIndex = startIndex + todosPerPage;
}

const visibleTodos = filteredTodos.slice(startIndex, endIndex);
  return (
    <Layout>
        {
      todo ? 
      (
        <>
      <div className=" w-full h-[42.5rem] relative ">
        <div className="p-6 dark:border-gray-700">
          <div className=" m-auto w-4/5 flex mt-4 justify-between">
          <div className=''>
          <TodoFilter
              selectedFilter={selectedFilter}
              handleFilterChange={handleFilterChange}
              search={search}
            />
          </div>
            <div className="flex">
              <input
                type="text"
                id="table-search"
                className="block outline-none p-2 ps-10 text-sm border-b text-gray-900 w-70 rounded-e-none  focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                value={search}
                onChange={handleSearchChange}
                onClick={() => {
                  setSelectedFilter("textFilter");
                  setSearchIcon(!searchIcon);
                }}
              />
              <button
                className={`text-black p-2.5 rounded-s-none rounded-lg bg-slate-300 px-3 ${
                  searchIcon ? "hidden" : ""
                }`}
                disabled={searchIcon ? true : false}
                onClick={() => {
                  setSelectedFilter("newest");
                  setSearch("");
                  setSearchIcon(!searchIcon);
                }}
              >
                {searchIcon ? <FaSearch /> : <RxCross2 />}
              </button>
            </div>
          </div>
          <table className=" m-auto w-4/5 mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
             <thead class="text-xs text-white uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">

            <tr className="">
                
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Email
                </th>
                <th scope="col" class="px-6 py-3">
                    Phone
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
            </tr>
        </thead>
            <tbody className=''>
              {noTodosFound ? (
                <tr>
                  <td colSpan="6" className="text-center mt-2">
                    {selectedFilter === "newest" && "No todo found"}
                    {selectedFilter === "1week" &&
                      "No todos found in the last 1 week"}
                    {selectedFilter === "2weeks" &&
                      "No todos found in the last 2 weeks"}
                    {selectedFilter === "1month" &&
                      "No todos found in the last 1 month"}
                    {selectedFilter === "lastmonth" &&
                      "No todos found in the last month"}
                    {selectedFilter === "important" &&
                      "No todos found in the important"}
                    {selectedFilter === "textFilter" && "no todo found"}
                  </td>
                </tr>
              ) : Array.isArray(visibleTodos) && visibleTodos.length > 0 ? (
                visibleTodos.map((item) => (
                  // <tr key={item._id}>
                  //   <td className="p-4">
                  //     <input type="checkbox" />
                  //   </td>
                  //   <td className="px-6 py-4">{item.name}</td>
                  //   <td className="px-6 py-4">{item.email}</td>
                  // </tr>
                  <tr key={item._id} class=" bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                <td class="px-6 py-4">
                    {item?.hospitalName}
                </td>
                <td class="px-6 py-4">
                    {item?.email}
                </td>
                <td class="px-6 py-4">
                    {item?.phone}
                </td>
                <td class="px-6 py-4">
                {moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </td>
            </tr>
                ))
              ) : (
                <tr>
                  <td className="text-white p-2">loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="absolute left-1/2 right-1/2 bottom-6">
          {Array.isArray(visibleTodos) && visibleTodos.length > 0 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
      ) :
    (<p className='m-3'>Loading...</p>)
     }
    </Layout>
  )
}

export default Hospital