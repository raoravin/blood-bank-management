import React from "react";

const TodoItems = ({ item }) => {
  console.log(item);
  console.log("hello");

  const handleViewClick = () => {
    // Handle view click action
    console.log(`Viewing todo with ID: ${id}`);
  };

  const handleEditClick = () => {
    // Handle edit click action
    console.log(`Editing todo with ID: ${id}`);
  };

  const handleDeleteClick = () => {
    // Handle delete click action
    console.log(`Deleting todo with ID: ${id}`);
  };

  return (
    <tr>
      <td className="p-4">
        {/* Checkbox column */}
        <input type="checkbox" />
      </td>
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4">
        <button onClick={handleViewClick} className="text-blue-500">
          View
        </button>
      </td>
      <td className="px-6 py-4">
        <button onClick={handleEditClick} className="text-yellow-500">
          Edit
        </button>
      </td>
      <td className="px-6 py-4">
        <button onClick={handleDeleteClick} className="text-red-500">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItems;
