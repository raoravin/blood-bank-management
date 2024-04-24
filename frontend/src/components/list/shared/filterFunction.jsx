export const filterFunction = (
    todo,
    setFilteredTodos,
    selectedFilter,
    setNoTodosFound,
    currentPage,
    todosPerPage,
    setCurrentPage,
    search
  ) => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);
  
    const twoWeeksAgo = new Date(currentDate);
    twoWeeksAgo.setDate(currentDate.getDate() - 14);
  
    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
  
    const lastMonthStartDate = new Date(currentDate);
    lastMonthStartDate.setMonth(currentDate.getMonth() - 2);
    const lastMonthEndDate = new Date(currentDate);
    lastMonthEndDate.setMonth(currentDate.getMonth() - 1);
  
    if (!Array.isArray(todo)) {
      setFilteredTodos([]);
      return;
    }
  
    const timeFilters = {
      newest: todo,
      "1week": todo.filter(
        (todoItem) => new Date(todoItem.createdAt) >= oneWeekAgo
      ),
      "2weeks": todo.filter(
        (todoItem) => new Date(todoItem.createdAt) >= twoWeeksAgo
      ),
      "1month": todo.filter(
        (todoItem) => new Date(todoItem.createdAt) >= oneMonthAgo
      ),
      lastmonth: todo.filter(
        (todoItem) =>
          new Date(todoItem.createdAt) >= lastMonthStartDate &&
          new Date(todoItem.createdAt) <= lastMonthEndDate
      ),
      important: todo.filter((todoItem) => todoItem.important === true),
      textFilter: search // Apply text filter only if search is defined
      ? todo.filter(
          (todoItem) =>
            (todoItem.email && todoItem.email.toLowerCase().includes(search.toLowerCase())) ||
            (todoItem.bloodGroup && todoItem.bloodGroup.toLowerCase().includes(search.toLowerCase())) ||
            (todoItem.inventoryType && todoItem.inventoryType.toLowerCase().includes(search.toLowerCase()))

        )
      : todo, // Return the original todos array if search is not defined
    };
    console.log(todo);
  
    const filteredTodo = timeFilters[selectedFilter] || [];
    if (filteredTodo.length === 0) {
      setNoTodosFound(true);
    } else {
      setNoTodosFound(false);
    }
  
    setFilteredTodos(filteredTodo);
  
    if (currentPage > Math.ceil(filteredTodo.length / todosPerPage)) {
      setCurrentPage(1);
    }
  };
  