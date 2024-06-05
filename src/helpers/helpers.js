export const randomValue = (itemsSize) => {
  return Math.floor(Math.random() * itemsSize);
};

export const getItemsFromArrIndex = (arrData, arrIndex) => {
  return arrIndex.map((index) => ({ ...arrData[index], index }));
};

export const getIndexesFromData = (initData) => {
  return initData.map((value) => value.index);
};

export const getDataByID = (arr, id) => {
  return arr.find((item) => item.id === id);
};

export function convertTitleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function searchTodosBySlug(todos, query) {
  const querySlug = convertTitleToSlug(query);
  return todos.filter((todo) => todo.slug.includes(querySlug));
}

export function checkOverdueTodos(todos) {
  const now = new Date();

  return todos.map((todo) => {
    const todoDate = new Date(todo.date);
    const [hours, minutes] = todo.time.split(":");
    todoDate.setHours(hours);
    todoDate.setMinutes(minutes);

    todo.isOverdue = todoDate < now;
    return todo;
  });
}

export function filterOverdueTodos(todos) {
  return todos.filter((todo) => todo.isOverdue);
}

export function initialCheckOverdueTodo(todo) {
  const now = new Date();
  const todoDate = new Date(todo.date);
  const [hours, minutes] = todo.time.split(":");
  todoDate.setHours(hours);
  todoDate.setMinutes(minutes);

  todo.isOverdue = todoDate < now;
  return todo.isOverdue;
}

export function todayTodos(todos) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return todos.filter((todo) => {
    const todoDate = new Date(todo.date);
    const [hours, minutes] = todo.time.split(":");
    todoDate.setHours(hours);
    todoDate.setMinutes(minutes);

    const todoDateOnly = new Date(
      todoDate.getFullYear(),
      todoDate.getMonth(),
      todoDate.getDate()
    );

    todo.isOverdue = todoDate < now;

    console.log(todoDateOnly.getTime(), today.getTime());

    todo.isToday = todoDateOnly.getTime() === today.getTime();

    return todo.isToday && todo;
  });
}

export function readableDate(date) {
  if (!date) return "";
  console.log(date);
  const tgl = new Date(toString(date));
  console.log(tgl.toLocaleDateString("id-ID"));
}

export function importantTodos(todos) {
  return todos.filter((todo) => todo.important);
}

export function searchBySlug(data, query) {
  if (!data?.length && !data?.length > 0) return data;

  if (!query || typeof query !== "string") {
    throw new Error("Query must be a non-empty string.");
  }
  const keywords = query.toLowerCase().split(/\s+/);

  return data.filter((item) => {
    const slug = item.slug.toLowerCase();
    return keywords.every((keyword) => slug.includes(keyword));
  });
}

export function filterByCategory(data, category) {
  if (!data?.length && !data?.length > 0) return data;

  if (!category || typeof category !== "string") {
    throw new Error("Category must be a non-empty string.");
  }
  return data.filter((item) =>
    item.categories.some((cat) => {
      console.log(cat);
      return cat.value === category;
    })
  );
}

export function sortByName(data) {
  return data.slice().sort((a, b) => {
    if (!a.title || !b.title) {
      throw new Error("Both items must have a title property.");
    }
    return a.title.localeCompare(b.title);
  });
}

export function sortByDate(data) {
  return data.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (isNaN(dateA) || isNaN(dateB)) {
      throw new Error("Both items must have a valid date property.");
    }
    return dateB - dateA;
  });
}

export function sortTodos(todos, sortCriteria) {
  if (!todos?.length && !todos?.length > 0) return todos;

  if (sortCriteria === "Name") {
    return sortByName(todos);
  } else if (sortCriteria === "Date") {
    return sortByDate(todos);
  } else {
    throw new Error("Invalid sort criteria. Use 'Name' or 'Date'.");
  }
}
