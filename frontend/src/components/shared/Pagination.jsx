import React from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const renderPaginationButtons = () => {
    const totalButtonsToShow = 3; // Adjust this value as needed
    const buttons = [];

    const addButtons = (start, end) => {
      for (let i = start; i <= end; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`py-2 px-3 mx-1 mt-5 border rounded-md ${
              currentPage === i ? "bg-green-500 text-white" : "bg-white text-black"
            }`}
          >
            {i}
          </button>
        );
      }
    };

    if (totalPages <= totalButtonsToShow) {
      addButtons(1, totalPages);
    } else {
      const leftOffset = Math.max(1, currentPage - Math.floor(totalButtonsToShow / 2));
      const rightOffset = Math.min(totalPages, currentPage + Math.floor(totalButtonsToShow / 2));

      if (leftOffset > 1) {
        addButtons(1, 1); // Always include page 1
        if (leftOffset > 2) {
          buttons.push(<span className="text-white mt-6" key="ellipsis-start">...</span>);
        }
      }

      addButtons(leftOffset, rightOffset);

      if (rightOffset < totalPages) {
        if (rightOffset < totalPages - 1) {
          buttons.push(<span className="text-white mt-6" key="ellipsis-end">...</span>);
        }
        addButtons(totalPages, totalPages); // Always include the last page
      }
    }

    return buttons;
  };

  return (
    <div>
      <div className=" flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-2 px-2 mx-1 mt-5 border rounded-md ${currentPage === 1 ? "hidden" : "bg-white"} text-gray-600`}
        >
          <GrPrevious />
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`py-2 px-2 mx-1 mt-5 border rounded-md ${currentPage === totalPages ? "hidden" : "bg-white"} text-gray-600`}
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
