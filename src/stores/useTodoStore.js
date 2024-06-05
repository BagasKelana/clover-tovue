import { defineStore } from "pinia";
import { ref } from "vue";
import { checkOverdueTodos } from "../helpers/helpers";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref([]);

  const loadTodos = () => {
    const storedTodos = localStorage.getItem("todos");

    const parseTodo = JSON.parse(storedTodos);
    if (parseTodo?.length && parseTodo?.length > 0) {
      todos.value = checkOverdueTodos(parseTodo);
    } else {
      todos.value = [];
    }
  };

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  };

  const getTodos = () => {
    return todos.value;
  };

  const addTodo = (todo) => {
    loadTodos();
    todos.value.push(todo);
    saveTodos();
  };

  const editTodo = (id, updatedTodo) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value[index] = updatedTodo;
      saveTodos();
    }
  };

  const setIsDone = (id) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value[index] = {
        ...todos.value[index],
        isDone: !todos.value[index].isDone,
      };
      saveTodos();
    }
  };

  const deleteTodo = (id) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
      saveTodos();
    }
  };

  const markImportantTodo = (id) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value[index] = {
        ...todos.value[index],
        important: !todos.value[index].important,
      };
      saveTodos();
    }
  };

  return {
    todos,
    loadTodos,
    getTodos,
    addTodo,
    editTodo,
    setIsDone,
    deleteTodo,
    markImportantTodo,
  };
});
