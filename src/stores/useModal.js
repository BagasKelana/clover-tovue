import { defineStore } from "pinia";
import { ref } from "vue";
import { useTodoStore } from "./useTodoStore";

export const useDeleteModal = defineStore("deleteModal", () => {
  const modal = ref(false);
  const todoId = ref(null);
  const { deleteTodo } = useTodoStore();

  const getModal = () => {
    return modal.value;
  };

  const openModal = (id) => {
    modal.value = !modal.value;
    todoId.value = id;
    console.log(modal.value, id);
  };

  const closeModal = () => {
    modal.value = false;
    todoId.value = null;

    console.log(modal.value);
  };

  const acceptActionModal = () => {
    deleteTodo(todoId.value);
    closeModal();
  };

  return { openModal, closeModal, acceptActionModal, modal, todoId, getModal };
});

export const useEditModal = defineStore("editModal", () => {
  const modal = ref(false);
  const todoId = ref("");

  const getModal = () => {
    return modal.value;
  };
  const getId = () => {
    return todoId.value;
  };

  const openModal = (id) => {
    modal.value = true;
    todoId.value = id;
  };

  const closeModal = () => {
    modal.value = false;
  };

  const acceptActionModal = () => {
    closeModal();
  };

  return {
    openModal,
    closeModal,
    acceptActionModal,
    modal,
    todoId,
    getModal,
    getId,
  };
});
