import Layout from '.././components/shared/layout/Layout'
import React, { useContext, useEffect, useState } from "react";
import { todoContext } from "../context/ListContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from ".././components/shared/Pagination";
import TodoFilter from ".././components/shared/ListFilter";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useSelector } from "react-redux";
import { filterFunction } from ".././components/list/shared/filterFunction";

const Donation = () => {
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
  

  const getDonars = async () => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      const {data} = await axios.post("http://localhost:8080/api/v1/inventory/get-inventory-hospital",{
        filters:{
            inventoryType:'in',
            donar: user?._id,
        }
      },config)
     setTodo(data.inventories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDonars();
  },[])
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
      <div className="bg-red-700 w-auto h-[42.5rem] relative dark:bg-gray-800 dark:border-gray-700 shadow-md sm:rounded-lg">
        <div className="p-6  dark:border-gray-700">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
            <TodoFilter
              selectedFilter={selectedFilter}
              handleFilterChange={handleFilterChange}
              search={search}
            />
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="flex">
              <input
                type="text"
                id="table-search"
                className="block outline-none p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 rounded-e-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                value={search}
                onChange={handleSearchChange}
                onClick={() => {
                  setSelectedFilter("textFilter");
                  setSearchIcon(!searchIcon);
                }}
              />
              <button
                className={`text-black rounded-s-none rounded-lg bg-slate-300 p-3 ${
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
          <table className="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className=" bg-slate-700">
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 w-1/5 text-sm">
                  Title
                </th>
                <th scope="col" className="px-6 py-4 w-2/5 text-sm">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
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
                  <tr key={item._id}>
                    <td className="p-4">
                      <input type="checkbox" />
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.email}</td>
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

export default Donation;