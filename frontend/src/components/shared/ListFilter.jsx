// TodoFilter.js
import React from "react";

const ListFilter = ({ selectedFilter, handleFilterChange,search}) => {

  const find = () => {
    setCurrentPage(1);
  }
    
  return (
      <div>
        {/* Dropdown menu */}
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className=" border-2 py-2.5 bg-gray-500 hover:bg-slate-600 text-white  font-medium rounded-lg text-base px-4 text-center outline-none inline-flex items-center"
        >
          <option value="newest">Newest</option>
          <option value="1week">1 Week</option>
          <option value="2weeks">2 Weeks</option>
          <option value="1month">1 Month</option>
          <option value="lastmonth">Last Month</option>
          <option value="important">important</option>
          <option className=" hidden" value="textFilter">{search === "" ? "searching" : "result" }</option>        </select>
      </div>
  );
};
export default ListFilter;
